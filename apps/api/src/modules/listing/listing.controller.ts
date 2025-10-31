import { Controller, Get, Param } from '@nestjs/common'
import { ListingService } from './listing.service'
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger'
import { ListingDto } from './dtos/listing.dto'

@Controller('listings')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @ApiOperation({
    operationId: 'listListings',
    summary: 'List listings',
    description: 'Get all listings.',
  })
  @ApiOkResponse({ type: [ListingDto] })
  @Get()
  async list() {
    return this.listingService.list()
  }

  @ApiOperation({
    operationId: 'findListingById',
    summary: 'Find listing by id',
    description: 'Get a listing by its id',
  })
  @ApiOkResponse({ type: ListingDto })
  @ApiParam({ name: 'id', type: String, description: 'Listing id' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.listingService.findById(id)
  }
}
