import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import type { Request } from 'express';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  private readonly logger = new Logger('SessionGuard');

  private getSessionCookie(val: unknown): string | null {
    if (typeof val !== 'object' || val === null) return null;
    const rec = val as Record<string, unknown>;
    return typeof rec.session === 'string' ? rec.session : null;
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>();
    const ip =
      req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const token = this.getSessionCookie(req.cookies);
    if (!token) {
      this.logger.warn(`Missing session cookie — IP: ${ip as string}`);
      throw new UnauthorizedException('Missing session cookie');
    }

    const user = await this.auth.validateSession(token);
    if (!user) {
      this.logger.warn(`Invalid or expired session — IP: ${ip as string}`);
      throw new UnauthorizedException('Invalid or expired session');
    }

    req.user = user;
    return true;
  }
}
