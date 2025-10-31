import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dtos/create-brand.dto';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { SessionGuard } from '../auth/guards/session.guard';
import { UpdateBrandDto } from './dtos/update-brand.dto';
import { BrandDto } from './dtos/brand.dto';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({
    operationId: 'listBrands',
    summary: 'List brands',
    description: 'Get all brands.',
  })
  @ApiOkResponse({ type: [BrandDto] })
  @Get()
  async findAll() {
    return await this.brandService.findAll();
  }

  @ApiOperation({
    operationId: 'findBrandById',
    summary: 'Find brand by id',
    description: 'Get a brand by its id',
  })
  @ApiOkResponse({ type: BrandDto })
  @ApiParam({ name: 'id', type: String, description: 'Brand id' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.brandService.findById(id);
  }

  @ApiCookieAuth('session')
  @ApiOperation({
    operationId: 'createBrand',
    summary: 'Create brand',
    description: 'Create a new brand.',
  })
  @ApiBody({ type: CreateBrandDto })
  @Post()
  @UseGuards(SessionGuard)
  async create(@Body() brandDto: CreateBrandDto) {
    return await this.brandService.create(brandDto);
  }

  @ApiCookieAuth('session')
  @ApiOperation({
    operationId: 'updateBrand',
    summary: 'Update brand',
    description: 'Update a brand by id.',
  })
  @ApiBody({ type: UpdateBrandDto })
  @ApiParam({ name: 'id', type: String, description: 'Brand id' })
  @Put(':id')
  @UseGuards(SessionGuard)
  async update(@Param('id') id: string, @Body() brandDto: UpdateBrandDto) {
    return await this.brandService.update(id, brandDto);
  }
}
