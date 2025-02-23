import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './schemas/books.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: any): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(@Query('query') query: string): Promise<Book[]> {
    if (query) {
      return this.booksService.search(query);
    }
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: any): Promise<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Book> {
    return this.booksService.delete(id);
  }
}
