import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from './schemas/authors.schema';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author.name) private readonly authorModel: Model<Author>) {}

  async create(authorData: any): Promise<Author> {
    const createdAuthor = new this.authorModel(authorData);
    return createdAuthor.save();
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async findOne(id: string): Promise<Author> {
    return this.authorModel.findById(id).exec();
  }

  async update(id: string, updatedAuthorData: any): Promise<Author> {
    return this.authorModel.findByIdAndUpdate(id, updatedAuthorData, { new: true }).exec();
  }

  async delete(id: string): Promise<Author> {
    return this.authorModel.findOneAndDelete({ _id: id }).exec();
  }

  async search(query: string): Promise<Author[]> {
    return this.authorModel.find({ name: { $regex: query, $options: 'i' } }).exec();
  }
}
