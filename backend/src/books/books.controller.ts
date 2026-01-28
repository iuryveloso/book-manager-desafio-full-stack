import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common'
import { BooksService } from './books.service'
import { BookDto } from './dto/book.dto'
import { AuthGuard } from '../auth/auth.guard'
import { UserDto } from '../users/dto/user.dto'

interface RequestCustom extends Request {
  user?: UserDto
}

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() request: RequestCustom, @Body() bookDto: BookDto) {
    const userID = request.user?.sub as string
    return this.booksService.create(userID, bookDto)
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Req() request: RequestCustom,
    @Query('itemsPerPage') itemsPerPage: number,
    @Query('page') page: number,
    @Query('search') search: string,
  ) {
    const userID = request.user?.sub as string
    return this.booksService.findAll(userID, itemsPerPage, page, search)
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Req() request: RequestCustom, @Param('id') id: string) {
    const userID = request.user?.sub as string
    return this.booksService.findOne(userID, id)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Req() request: RequestCustom,
    @Param('id') id: string,
    @Body() bookDto: BookDto,
  ) {
    const userID = request.user?.sub as string
    return this.booksService.update(userID, id, bookDto)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Req() request: RequestCustom, @Param('id') id: string) {
    const userID = request.user?.sub as string
    return this.booksService.remove(userID, id)
  }
}
