import { Injectable } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { UpdateUserDto } from './dtos/update-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return await this.userRepository.selectAll()
  }

  async findById(id: string) {
    return await this.userRepository.selectById(id)
  }

  async update(id: string, input: UpdateUserDto) {
    return this.userRepository.update(id, input)
  }
}
