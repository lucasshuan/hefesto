import { Injectable } from '@nestjs/common'
import { ListingRepository } from './listing.repository'

@Injectable()
export class ListingService {
  constructor(private readonly listingRepository: ListingRepository) {}

  async list() {
    return this.listingRepository.selectAll()
  }

  async findById(id: string) {
    return this.listingRepository.selectById(id)
  }
}
