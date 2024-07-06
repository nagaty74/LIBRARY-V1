// books.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/books.schema';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])]
})
export class BooksModule {}
