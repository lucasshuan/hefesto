import { ApiProperty } from '@nestjs/swagger';

export class ListingDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  componentId: string;

  @ApiProperty()
  sourceId: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  available: boolean;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
