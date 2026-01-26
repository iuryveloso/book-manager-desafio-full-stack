import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from './auth.guard'

describe('AuthGuard', () => {
  let authGuard: AuthGuard
  let jwtService: JwtService
  let configService: ConfigService

  beforeEach(() => {
    jwtService = {
      verifyAsync: jest.fn(),
    } as unknown as JwtService

    configService = {
      get: jest.fn(),
    } as unknown as ConfigService

    authGuard = new AuthGuard(jwtService, configService)
  })
  it('should be defined', () => {
    expect(authGuard).toBeDefined()
  })
})
