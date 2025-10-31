import { Injectable } from '@nestjs/common'
import { BrandRepository } from './brand.repository'
import { CreateBrandDto } from './dtos/create-brand.dto'
import { UpdateBrandDto } from './dtos/update-brand.dto'

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async findAll() {
    return this.brandRepository.selectAll()
  }

  async findById(id: string) {
    return this.brandRepository.selectById(id)
  }

  async create(input: CreateBrandDto) {
    return this.brandRepository.insert(input)
  }

  async update(id: string, input: UpdateBrandDto) {
    return this.brandRepository.update(id, input)
  }
}
