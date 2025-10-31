import type { UserRole } from '@/common/enums/user-role.enum'

declare global {
  namespace Express {
    interface User {
      id: string
      email: string
      name: string
      imageUrl: string | null
      emailVerified: boolean
      role: UserRole
      createdAt: Date
      updatedAt: Date
    }
  }
}

export {}
