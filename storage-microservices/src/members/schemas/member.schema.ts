import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Member extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  membershipNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  address: string;

  @Prop({ required: true })
  joinedDate: Date;

  @Prop()
  photo: string; // Add this line to include photo
}

export const MemberSchema = SchemaFactory.createForClass(Member);
