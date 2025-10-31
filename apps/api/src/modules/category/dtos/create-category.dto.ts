import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsString } from 'class-validator'

export class CreateCategoryDto {
  @ApiProperty()
  @IsString({ message: "Field 'name' must be a string" })
  name: string

  @ApiProperty()
  @IsString({ message: "Field 'parentCategoryId' must be a string" })
  @IsNumberString(
    {},
    { message: 'Field "parentCategoryId" must be a numeric string' }
  )
  parentCategoryId?: string
}
