import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { SourceService } from './source.service'
import {
  ApiBody,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger'
import { SessionGuard } from '../auth/guards/session.guard'
import { UpdateSourceDto } from './dtos/update-source.dto'
import { CreateSourceDto } from './dtos/create-source.dto'
import { SourceDto } from './dtos/source.dto'

@Controller('sources')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @ApiOperation({
    operationId: 'listSources',
    summary: 'List sources',
    description: 'Get all sources',
  })
  @ApiOkResponse({ type: [SourceDto] })
  @Get()
  async list() {
    return this.sourceService.list()
  }

  @ApiOperation({
    operationId: 'findSourceById',
    summary: 'Find source by id',
    description: 'Get a source by its id',
  })
  @ApiOkResponse({ type: SourceDto })
  @ApiParam({ name: 'id', type: String, description: 'Source id' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.sourceService.findById(id)
  }

  @ApiCookieAuth('session')
  @ApiOperation({
    operationId: 'createSource',
    summary: 'Create source',
    description: 'Create a new source',
  })
  @ApiBody({ type: CreateSourceDto })
  @Post()
  @UseGuards(SessionGuard)
  async create(@Body() sourceDto: CreateSourceDto) {
    return await this.sourceService.create(sourceDto)
  }

  @ApiCookieAuth('session')
  @ApiOperation({
    operationId: 'updateSource',
    summary: 'Update source',
    description: 'Update a source by id',
  })
  @ApiBody({ type: UpdateSourceDto })
  @ApiParam({ name: 'id', type: String, description: 'Source id' })
  @Put(':id')
  @UseGuards(SessionGuard)
  async update(@Param('id') id: string, @Body() sourceDto: UpdateSourceDto) {
    return await this.sourceService.update(id, sourceDto)
  }
}
