import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@Schema()
export class Book extends Document {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  publishedYear: number;
  
  @Prop()
  photo: string; // Ensure this field is present
}

export const BookSchema = SchemaFactory.createForClass(Book);
