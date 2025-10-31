import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async list() {
    return this.categoryRepository.selectAll();
  }

  async findById(id: string) {
    return this.categoryRepository.selectById(id);
  }

  async create(categoryDto: CreateCategoryDto) {
    return this.categoryRepository.insert(categoryDto);
  }

  async update(id: string, categoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, categoryDto);
  }
}
