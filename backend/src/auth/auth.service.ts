import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { RegisterDto } from './dto/register.dto'
import { appendFile } from 'node:fs'
import { ConfigService } from '@nestjs/config'
import type { Response } from 'express'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async login(res: Response, loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    })

    if (!user) throw new BadRequestException(['Invalid credentials'])

    const isPasswordValid = bcrypt.compareSync(loginDto.password, user.password)

    if (!isPasswordValid) throw new BadRequestException(['Invalid credentials'])

    const token = this.jwtService.sign({
      name: user.name,
      email: user.email,
      sub: user.id,
    })

    try {
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: this.config.get<string>('NODE_ENV') === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
    } catch (error) {
      console.log('Cookie Setting Error:', error)
      throw new InternalServerErrorException([
        'Unable to login user. Try again later',
      ])
    }

    return { response_message: 'Login successfully' }
  }

  async register(res: Response, registerDto: RegisterDto) {
    const isUserRegistered = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    })

    if (isUserRegistered) throw new BadRequestException(['User already exists'])

    try {
      const salt = await bcrypt.genSalt(10)
      const user = await this.prisma.user.create({
        data: {
          name: registerDto.name,
          email: registerDto.email,
          password: await bcrypt.hash(registerDto.password, salt),
        },
      })

      const token = this.jwtService.sign({
        name: user.name,
        email: user.email,
        sub: user.id,
        avatar: user.avatar as string,
      })

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: this.config.get<string>('NODE_ENV') === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })

      return { response_message: 'Registration successfully' }
    } catch (error) {
      const logPath = this.config.get<string>('LOG_PATH') as string

      appendFile(logPath, JSON.stringify(error), (err) => {
        if (err) console.error('Failed to write to log file:', err)
      })

      console.error(error)
      throw new InternalServerErrorException([
        'Unable to register user. Try again later',
      ])
    }
  }

  logout(res: Response) {
    try {
      res.clearCookie('auth_token', {
        httpOnly: true,
        secure: this.config.get<string>('NODE_ENV') === 'production',
        sameSite: 'lax',
      })
    } catch (error) {
      console.log('Cookie Setting Error:', error)
      throw new InternalServerErrorException([
        'Unable to logout user. Try again later',
      ])
    }
    return { response_message: 'Logout successfully' }
  }
}
