import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { extname } from 'path'

@Injectable()
export class FileTypeValidator implements PipeTransform {
  private allowedExtensions: string[] = []
  constructor(filetype: string[]) {
    this.allowedExtensions = filetype
  }

  transform(value: Express.Multer.File) {
    const extension = extname(value.originalname)
    if (!this.allowedExtensions.includes(extension)) {
      throw new BadRequestException([`File type ${extension} not supported`])
    }
    return value
  }
}
