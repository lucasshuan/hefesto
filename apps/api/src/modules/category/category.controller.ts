import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { UpdateCategoryDto } from './dtos/update-category.dto'
import { CreateCategoryDto } from './dtos/create-category.dto'
import {
  ApiBody,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger'
import { SessionGuard } from '../auth/guards/session.guard'
import { CategoryDto } from './dtos/category.dto'
import { CategoryService } from './category.service'

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    operationId: 'listCategories',
    summary: 'List categories',
    description: 'Get all categories',
  })
  @ApiOkResponse({ type: [CategoryDto] })
  @Get()
  async list() {
    return await this.categoryService.list()
  }

  @ApiOperation({
    operationId: 'findCategoryById',
    summary: 'Find category by id',
    description: 'Get a category by its id',
  })
  @ApiOkResponse({ type: CategoryDto })
  @ApiParam({ name: 'id', type: String, description: 'Category id' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.categoryService.findById(id)
  }

  @ApiCookieAuth('session')
  @ApiOperation({
    operationId: 'createCategory',
    summary: 'Create category',
    description: 'Create a new category',
  })
  @ApiBody({ type: CreateCategoryDto })
  @Post()
  @UseGuards(SessionGuard)
  async create(@Body() categoryDto: CreateCategoryDto) {
    return await this.categoryService.create(categoryDto)
  }

  @ApiCookieAuth('session')
  @ApiOperation({
    operationId: 'updateCategory',
    summary: 'Update category',
    description: 'Update a category by id',
  })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiParam({ name: 'id', type: String, description: 'Category id' })
  @Put(':id')
  @UseGuards(SessionGuard)
  async update(
    @Param('id') id: string,
    @Body() categoryDto: UpdateCategoryDto
  ) {
    return await this.categoryService.update(id, categoryDto)
  }
}
