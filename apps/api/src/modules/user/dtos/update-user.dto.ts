import { UserRole } from '@/common/enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString({ message: 'Field "name" must be a string' })
  @IsOptional()
  name?: string;

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  @IsString({ message: 'Field "role" must be a string' })
  @IsEnum(UserRole, {
    message: `Field "role" must be one of: ${Object.values(UserRole).join(', ')}`,
  })
  @IsOptional()
  role?: UserRole;
}
