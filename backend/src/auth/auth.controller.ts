import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import type { Response } from 'express'
import { AuthGuard } from './auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(res, loginDto)
  }

  @Post('register')
  register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.register(res, registerDto)
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res)
  }
}
