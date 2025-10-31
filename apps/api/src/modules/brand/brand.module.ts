import { Module } from '@nestjs/common'
import { BrandService } from './brand.service'
import { BrandController } from './brand.controller'
import { BrandRepository } from './brand.repository'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [AuthModule],
  providers: [BrandService, BrandRepository],
  controllers: [BrandController],
})
export class BrandModule {}
