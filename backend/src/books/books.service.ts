import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { BookDto } from './dto/book.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { ConfigService } from '@nestjs/config'
import { appendFile } from 'node:fs'
import { Book } from './entities/book.entity'

@Injectable()
export class BooksService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}
  async create(userID: string, bookDto: BookDto) {
    try {
      await this.prisma.book.create({
        data: {
          title: bookDto.title,
          author: bookDto.author,
          userId: userID,
          description: bookDto.description,
          year: bookDto.year,
        },
      })
    } catch (error) {
      const logPath = this.config.get<string>('LOG_PATH') as string

      appendFile(logPath, JSON.stringify(error), (err) => {
        if (err) console.error('Failed to write to log file:', err)
      })

      console.error(error)
      throw new InternalServerErrorException([
        'Unable to register this book. Try again later',
      ])
    }

    return { response_message: 'Book registered successfully' }
  }

  async findAll(
    userID: string,
    itemsPerPage: number,
    page: number,
    search: string,
  ) {
    function paginateBooks(books: Book[], itemsPerPage: number) {
      const result: Book[][] = []
      const pages = Math.ceil(books.length / itemsPerPage)
      for (let i = 0; i < pages; i++) {
        const firstItemIndex = i * itemsPerPage
        const lastItemIndex = firstItemIndex + +itemsPerPage
        const booksSlice = books.slice(firstItemIndex, lastItemIndex)
        result.push(booksSlice)
      }
      return result
    }

    if (search) {
      const userData = await this.prisma.user.findUnique({
        where: { id: userID },
        include: {
          books: {
            orderBy: { title: 'asc' },
            where: {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { author: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { year: isNaN(Number(search)) ? undefined : Number(search) },
              ],
            },
          },
        },
      })

      if (!userData?.books)
        throw new InternalServerErrorException([
          'Unable to get the books. Try again later',
        ])

      const booksPaginated = paginateBooks(userData?.books, itemsPerPage)
      return {
        totalItems: userData.books.length,
        totalPages: booksPaginated.length,
        books: booksPaginated[page - 1] || [],
      }
    }

    const userData = await this.prisma.user.findUnique({
      where: { id: userID },
      include: {
        books: {
          orderBy: { title: 'asc' },
        },
      },
    })

    if (!userData?.books)
      throw new InternalServerErrorException([
        'Unable to get the books. Try again later',
      ])

    const booksPaginated = paginateBooks(userData?.books, itemsPerPage)
    return {
      totalItems: userData.books.length,
      totalPages: booksPaginated.length,
      books: booksPaginated[page - 1] || [],
    }
  }

  async findOne(userID: string, id: string) {
    const book = await this.prisma.book.findFirst({
      where: { id, userId: userID },
    })

    if (!book) {
      throw new BadRequestException(['Book not found'])
    }

    return book
  }

  async update(userID: string, id: string, bookDto: BookDto) {
    const book = await this.prisma.book.findFirst({
      where: { id, userId: userID },
    })

    if (!book) throw new BadRequestException(['Book not found'])

    try {
      await this.prisma.book.update({
        where: { id, userId: userID },
        data: {
          title: bookDto.title,
          author: bookDto.author,
          description: bookDto.description,
          year: bookDto.year,
        },
      })
    } catch (error) {
      const logPath = this.config.get<string>('LOG_PATH') as string

      appendFile(logPath, JSON.stringify(error), (err) => {
        if (err) console.error('Failed to write to log file:', err)
      })

      console.error(error)
      throw new InternalServerErrorException([
        'Unable to update this book. Try again later',
      ])
    }

    return { response_message: 'Book updated successfully' }
  }

  async remove(userID: string, id: string) {
    const book = await this.prisma.book.findFirst({
      where: { id, userId: userID },
    })

    if (!book) {
      throw new BadRequestException(['Book not found'])
    }

    try {
      await this.prisma.book.delete({
        where: { id, userId: userID },
      })
    } catch (error) {
      const logPath = this.config.get<string>('LOG_PATH') as string

      appendFile(logPath, JSON.stringify(error), (err) => {
        if (err) console.error('Failed to write to log file:', err)
      })

      console.error(error)
      throw new InternalServerErrorException([
        'Unable to remove this book. Try again later',
      ])
    }

    return { response_message: 'Book removed successfully' }
  }
}
