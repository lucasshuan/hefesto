import { Controller, Post } from '@nestjs/common'

@Controller('storage')
export class StorageController {
  constructor() {}

  @Post('upload')
  async upload() {
    return {}
  }
}
