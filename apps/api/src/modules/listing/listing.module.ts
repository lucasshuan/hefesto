import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { ListingRepository } from './listing.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ListingService, ListingRepository],
  controllers: [ListingController],
})
export class ListingModule {}
