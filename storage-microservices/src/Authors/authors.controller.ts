/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './schemas/authors.schema';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  async create(@Body() createAuthorDto: any): Promise<Author> {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  async findAll(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Author> {
    return this.authorsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAuthorDto: any): Promise<Author> {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Author> {
    return this.authorsService.delete(id);
  }
}
