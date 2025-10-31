import { Injectable } from '@nestjs/common'
import { and, eq } from 'drizzle-orm'
import { randomBytes, createHash } from 'crypto'
import { GoogleOAuthUser } from './__types__/google-oauth-user'
import { generateSnowflake } from '@/drizzle/helpers/snowflake'
import { InjectDb } from '@/db/decorators/inject-db.decorator'
import type { DbClient } from '@/db/__types__/db'
import { accounts, sessions, users } from '@/drizzle/schema'

@Injectable()
export class AuthService {
  constructor(@InjectDb() private readonly db: DbClient) {}

  private hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex')
  }

  async findOrCreateUser(oauth: GoogleOAuthUser) {
    const acc = await this.db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.providerId, 'google'),
          eq(accounts.accountId, oauth.providerAccountId)
        )
      )
      .limit(1)

    if (acc.length) {
      const [user] = await this.db
        .select()
        .from(users)
        .where(eq(users.id, acc[0].userId))
        .limit(1)
      return user
    }

    const userId = generateSnowflake()
    const [user] = await this.db
      .insert(users)
      .values({
        id: userId,
        email: oauth.email,
        name: oauth.name!,
        imageUrl: oauth.image ?? null,
      })
      .returning()

    await this.db.insert(accounts).values({
      accountId: oauth.providerAccountId,
      providerId: 'google',
      userId,
    })

    return user
  }

  async createSession(params: {
    userId: string
    ip?: string | null
    userAgent?: string | null
    ttlSeconds?: number
  }) {
    const token = randomBytes(48).toString('base64url')
    const tokenHash = this.hashToken(token)
    const expires = new Date(
      Date.now() + (params.ttlSeconds ?? 15 * 24 * 60 * 60) * 1000
    )

    await this.db.insert(sessions).values({
      token: tokenHash,
      userId: params.userId,
      ipAddress: params.ip ?? null,
      userAgent: params.userAgent ?? null,
      expiresAt: expires,
    })

    return { token, expires }
  }

  async validateSession(rawToken: string) {
    const tokenHash = this.hashToken(rawToken)
    const [session] = await this.db
      .select()
      .from(sessions)
      .where(eq(sessions.token, tokenHash))
      .limit(1)
    if (!session) return null
    if (session.expiresAt && session.expiresAt.getTime() < Date.now())
      return null

    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))
      .limit(1)

    return user ?? null
  }

  async revokeSession(rawToken: string) {
    const tokenHash = this.hashToken(rawToken)
    await this.db.delete(sessions).where(eq(sessions.token, tokenHash))
  }
}
