import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class FileSizeValidator implements PipeTransform {
  private maxSize: number = 0
  constructor(maxSize: number) {
    this.maxSize = maxSize
  }

  transform(value: Express.Multer.File) {
    const maxSizeinMb = this.maxSize / 1000000
    if (this.maxSize < value.size) {
      throw new BadRequestException([
        `File size must be bellow ${maxSizeinMb}MB`,
      ])
    }
    return value
  }
}
