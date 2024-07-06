import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  publishedYear: number;

  @Prop()
  genre: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
