import { Module } from '@nestjs/common'
import { BooksService } from './books.service'
import { BooksController } from './books.controller'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  controllers: [BooksController],
  providers: [BooksService, JwtService, PrismaService],
})
export class BooksModule {}
