import { Module } from '@nestjs/common'
import { StorageService } from './storage.service'

@Module({
  imports: [],
  controllers: [],
  providers: [StorageService],
})
export class StorageModule {}
