import { ComponentTier } from '@/common/enums/component-tier.enum'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumberString, IsString } from 'class-validator'

export class CreateComponentDto {
  @ApiProperty()
  @IsString({ message: 'Field "name" must be a string' })
  name: string

  @ApiProperty()
  @IsString({ message: 'Field "model" must be a string' })
  model: string

  @ApiProperty()
  @IsString({ message: 'Field "tier" must be a string' })
  @IsEnum(ComponentTier, { message: 'Field "tier" must be a valid tier' })
  tier: ComponentTier

  @ApiProperty()
  @IsString({ message: 'Field "description" must be a string' })
  description: string

  @ApiProperty()
  @IsString({ message: 'Field "brandId" must be a string' })
  @IsNumberString({}, { message: 'Field "brandId" must be a numeric string' })
  brandId: string

  @ApiProperty()
  @IsString({ message: 'Field "sourceId" must be a string' })
  @IsNumberString({}, { message: 'Field "sourceId" must be a numeric string' })
  sourceId: string
}
