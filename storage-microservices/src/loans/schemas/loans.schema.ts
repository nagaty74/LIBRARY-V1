/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Book } from '../../books/schemas/books.schema';
import { Member } from '../../members/schemas/member.schema';

@Schema()
export class Loan extends Document {
  @Prop({ type: Book, required: true })
  book: Book;

  @Prop({ type: Member, required: true })
  member: Member;

  @Prop({ required: true })
  loanDate: Date;

  @Prop()
  returnDate: Date;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
