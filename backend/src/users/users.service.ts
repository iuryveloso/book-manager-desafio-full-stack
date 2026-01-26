import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { UpdatePasswordUserDto } from './dto/update-password-user.dto'
import * as bcrypt from 'bcrypt'
import { appendFile, rm, writeFile } from 'node:fs'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) throw new BadRequestException(['User not registered'])

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: updateUserDto.email },
    })

    if (user && user.id !== id)
      throw new BadRequestException(['Email already registered'])

    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          name: updateUserDto.name,
          email: updateUserDto.email,
        },
      })
    } catch (error) {
      const logPath = this.config.get<string>('LOG_PATH') as string

      appendFile(logPath, JSON.stringify(error), (err) => {
        if (err) console.error('Failed to write to log file:', err)
      })

      console.error(error)
      throw new InternalServerErrorException([
        'Unable to update user. Try again later',
      ])
    }
    return { response_message: 'User updated successfully' }
  }

  async updateAvatar(id: string, file: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) throw new BadRequestException(['User not registered'])

    const uploadDest = this.config.get<string>('UPLOAD_DEST') as string
    const fileName = `${Date.now()}-${file.originalname}`
    const path = `${uploadDest}/${fileName}`

    writeFile(path, file.buffer, (error) => {
      if (error) {
        const logPath = this.config.get<string>('LOG_PATH') as string

        appendFile(logPath, JSON.stringify(error), (err) => {
          if (err) console.error('Failed to write to log file:', err)
        })

        console.error(error)
        throw new InternalServerErrorException([
          'Unable to update the image avatar. Try again later',
        ])
      }
    })

    if (user.avatar) {
      const rmPath = `${uploadDest}/${user.avatar}`
      rm(rmPath, (error) => {
        if (error) {
          const logPath = this.config.get<string>('LOG_PATH') as string

          appendFile(logPath, JSON.stringify(error), (err) => {
            if (err) console.error('Failed to write to log file:', err)
          })

          console.error(error)
          throw new InternalServerErrorException([
            'Unable to update the image avatar. Try again later',
          ])
        }
      })
    }

    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          avatar: fileName,
        },
      })
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException([
        'Unable to update the image avatar. Try again later',
      ])
    }

    return { response_message: 'Avatar updated successfully' }
  }

  async updatePassword(
    id: string,
    updatePasswordUserDto: UpdatePasswordUserDto,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) throw new BadRequestException(['User not registered'])

    const isCurrentPasswordValid = bcrypt.compareSync(
      updatePasswordUserDto.current_password,
      user.password,
    )

    if (!isCurrentPasswordValid)
      throw new BadRequestException(['Invalid credentials'])

    try {
      const salt = await bcrypt.genSalt(10)
      await this.prisma.user.update({
        where: { id },
        data: {
          password: await bcrypt.hash(updatePasswordUserDto.password, salt),
        },
      })
    } catch (error) {
      const logPath = this.config.get<string>('LOG_PATH') as string

      appendFile(logPath, JSON.stringify(error), (err) => {
        if (err) console.error('Failed to write to log file:', err)
      })

      console.error(error)
      throw new InternalServerErrorException([
        'Unable to update password. Try again later',
      ])
    }

    return { response_message: 'Password updated successfully' }
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({
        where: { id },
      })
    } catch (error) {
      const logPath = this.config.get<string>('LOG_PATH') as string

      appendFile(logPath, JSON.stringify(error), (err) => {
        if (err) console.error('Failed to write to log file:', err)
      })

      console.error(error)
      throw new InternalServerErrorException([
        'Unable to delete user. Try again later',
      ])
    }
    return { response_message: 'User deleted successfully' }
  }
}
