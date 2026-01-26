import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { UpdatePasswordUserDto } from './dto/update-password-user.dto'
import { UserDto } from './dto/user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileTypeValidator } from 'src/pipes/file-type-validator.pipe'
import { FileSizeValidator } from 'src/pipes/file-size-validator.pipe'

interface RequestCustom extends Request {
  user?: UserDto
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  findOne(@Req() request: RequestCustom) {
    const id = request.user?.sub as string
    return this.usersService.findOne(id)
  }

  @UseGuards(AuthGuard)
  @Patch()
  update(@Req() request: RequestCustom, @Body() updateUserDto: UpdateUserDto) {
    const id = request.user?.sub as string
    return this.usersService.update(id, updateUserDto)
  }

  @UseGuards(AuthGuard)
  @Patch('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  updateAvatar(
    @Req() request: RequestCustom,
    @UploadedFile(
      new FileTypeValidator(['.png', '.jpeg', '.jpg']),
      new FileSizeValidator(2000000),
    )
    file: Express.Multer.File,
  ) {
    const id = request.user?.sub as string
    return this.usersService.updateAvatar(id, file)
  }

  @UseGuards(AuthGuard)
  @Patch('password')
  updatePassword(
    @Req() request: RequestCustom,
    @Body() updatePasswordUserDto: UpdatePasswordUserDto,
  ) {
    const id = request.user?.sub as string
    return this.usersService.updatePassword(id, updatePasswordUserDto)
  }

  @UseGuards(AuthGuard)
  @Delete()
  remove(@Req() request: RequestCustom) {
    const id = request.user?.sub as string
    return this.usersService.remove(id)
  }
}
