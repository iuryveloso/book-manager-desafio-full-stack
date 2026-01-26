import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, JwtService, PrismaService],
})
export class UsersModule {}
