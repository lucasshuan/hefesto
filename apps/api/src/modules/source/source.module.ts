import { Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { SourceRepository } from './source.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [SourceService, SourceRepository],
  controllers: [SourceController],
})
export class SourceModule {}
