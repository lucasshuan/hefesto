import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    operationId: 'listUsers',
    summary: 'List users',
    description: 'Get all users.',
  })
  @ApiOkResponse({ type: [UserDto] })
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiOperation({
    operationId: 'findUserById',
    summary: 'Get user by id',
    description: 'Get user by id.',
  })
  @ApiOkResponse({ type: UserDto })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @ApiOperation({
    operationId: 'updateUser',
    summary: 'Update user by id',
    description: 'Update user by id.',
  })
  @ApiOkResponse({ type: UserDto })
  @Put(':id')
  async update(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    return await this.userService.update(id, userDto);
  }
}
