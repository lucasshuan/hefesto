import type { UserRole } from '@/common/enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  imageUrl: string | null;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty()
  role: UserRole;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
