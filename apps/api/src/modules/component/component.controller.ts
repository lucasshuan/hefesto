import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ComponentService } from './component.service'
import {
  ApiBody,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger'
import { SessionGuard } from '../auth/guards/session.guard'
import { UpdateComponentDto } from './dtos/update-component.dto'
import { CreateComponentDto } from './dtos/create-component.dto'
import { ComponentDto } from './dtos/component.dto'

@Controller('components')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @ApiOperation({
    operationId: 'listComponents',
    summary: 'List components',
    description: 'Get all components',
  })
  @ApiOkResponse({ type: [ComponentDto] })
  @Get()
  async list() {
    return await this.componentService.list()
  }

  @ApiOperation({
    operationId: 'findComponentById',
    summary: 'Find component by id',
    description: 'Get a component by its id',
  })
  @ApiOkResponse({ type: ComponentDto })
  @ApiParam({ name: 'id', type: String, description: 'Component id' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.componentService.findById(id)
  }

  @ApiCookieAuth('session')
  @ApiOperation({
    operationId: 'createComponent',
    summary: 'Create component',
    description: 'Create a new component',
  })
  @ApiBody({ type: CreateComponentDto })
  @Post()
  @UseGuards(SessionGuard)
  async create(@Body() componentDto: CreateComponentDto) {
    return await this.componentService.create(componentDto)
  }

  @ApiCookieAuth('session')
  @ApiOperation({
    operationId: 'updateComponent',
    summary: 'Update component',
    description: 'Update a component by id',
  })
  @ApiBody({ type: UpdateComponentDto })
  @ApiParam({ name: 'id', type: String, description: 'Component id' })
  @Put(':id')
  @UseGuards(SessionGuard)
  async update(
    @Param('id') id: string,
    @Body() componentDto: UpdateComponentDto
  ) {
    return await this.componentService.update(id, componentDto)
  }
}
