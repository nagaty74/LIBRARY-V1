import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from './schemas/member.schema';

@Injectable()
export class MembersService {
  constructor(@InjectModel(Member.name) private readonly memberModel: Model<Member>) {}

  async create(memberData: any): Promise<Member> {
    const createdMember = new this.memberModel(memberData);
    return createdMember.save();
  }

  async findAll(): Promise<Member[]> {
    return this.memberModel.find().exec();
  }

  async findOne(id: string): Promise<Member> {
    return this.memberModel.findById(id).exec();
  }

  async update(id: string, updatedMemberData: any): Promise<Member> {
    return this.memberModel.findByIdAndUpdate(id, updatedMemberData, { new: true }).exec();
  }

  async delete(id: string): Promise<Member> {
    return this.memberModel.findOneAndDelete({ _id: id }).exec();
  }

  async search(query: string): Promise<Member[]> {
    return this.memberModel.find({ name: { $regex: query, $options: 'i' } }).exec();
  }
}
