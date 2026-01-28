import { Test, TestingModule } from '@nestjs/testing'
import { BooksController } from './books.controller'
import { BooksService } from './books.service'
import { PrismaService } from '../prisma/prisma.service'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

describe('BooksController', () => {
  let controller: BooksController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService, PrismaService, ConfigService, JwtService],
    }).compile()

    controller = module.get<BooksController>(BooksController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
