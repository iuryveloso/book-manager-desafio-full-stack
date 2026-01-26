import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { appendFile } from 'node:fs'
import { UserDto } from 'src/users/dto/user.dto'

interface RequestCustom extends Request {
  user?: UserDto
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: RequestCustom = context.switchToHttp().getRequest()
    const token = request.cookies['auth_token'] as string

    if (!token) throw new UnauthorizedException('No token provided')

    try {
      const user = await this.jwtService.verifyAsync<UserDto>(token, {
        secret: this.config.get<string>('JWT_SECRET'),
        algorithms: ['HS256'],
      })

      request.user = {
        name: user.name,
        email: user.email,
        sub: user.sub,
        avatar: user.avatar,
      }
    } catch (error) {
      const logPath = this.config.get<string>('LOG_PATH') as string

      appendFile(logPath, JSON.stringify(error), (err) => {
        if (err) console.error('Failed to write to log file:', err)
      })

      console.error(error)
      throw new UnauthorizedException('Invalid token')
    }

    return true
  }
}
