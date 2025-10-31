import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'
import { UserController } from './user.controller'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [AuthModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
