import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/books.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private readonly bookModel: Model<Book>) {}

  async create(bookData: any): Promise<Book> {
    const createdBook = new this.bookModel(bookData);
    return createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async update(id: string, updatedBookData: any): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, updatedBookData, { new: true }).exec();
  }

  async delete(id: string): Promise<Book> {
    return this.bookModel.findOneAndDelete({ _id: id }).exec();
  }

  async search(query: string): Promise<Book[]> {
    return this.bookModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } }
      ]
    }).exec();
  }
}
