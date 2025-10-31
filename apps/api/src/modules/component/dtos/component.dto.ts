import type { ComponentTier } from '@/common/enums/component-tier.enum'
import { ApiProperty } from '@nestjs/swagger'

export class ComponentDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  brandId: string | null

  @ApiProperty()
  categoryId: string | null

  @ApiProperty()
  model: string | null

  @ApiProperty()
  tier: ComponentTier

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
