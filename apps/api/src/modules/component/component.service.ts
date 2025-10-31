import { Injectable } from '@nestjs/common'
import { ComponentRepository } from './component.repository'
import { UpdateComponentDto } from './dtos/update-component.dto'
import { CreateComponentDto } from './dtos/create-component.dto'

@Injectable()
export class ComponentService {
  constructor(private readonly componentRepository: ComponentRepository) {}

  async list() {
    return this.componentRepository.selectAll()
  }

  async findById(id: string) {
    return this.componentRepository.selectById(id)
  }

  async create(componentDto: CreateComponentDto) {
    return this.componentRepository.insert(componentDto)
  }

  async update(id: string, componentDto: UpdateComponentDto) {
    return this.componentRepository.update(id, componentDto)
  }
}
