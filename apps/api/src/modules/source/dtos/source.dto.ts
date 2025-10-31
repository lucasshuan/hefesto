import type { SourceTrustLevel } from '@/common/enums/source-trust-level.enum';
import type { SourceVendorType } from '@/common/enums/source-vendor-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SourceDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  domain: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  vendorType: SourceVendorType;

  @ApiProperty()
  trustLevel: SourceTrustLevel;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
