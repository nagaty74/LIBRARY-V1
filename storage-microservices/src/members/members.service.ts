import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from './schemas/member.schema';

@Injectable()
export class MembersService {
  constructor(@InjectModel(Member.name) private readonly membersModel: Model<Member>) {}

  async create(memberData: any): Promise<Member> {
    const createdMember = new this.membersModel(memberData);
    return createdMember.save();
  }

  async findAll(): Promise<Member[]> {
    return this.membersModel.find().exec();
  }

  async findOne(id: string): Promise<Member> {
    return this.membersModel.findById(id).exec();
  }

  async update(id: string, updatedMemberData: any): Promise<Member> {
    return this.membersModel.findByIdAndUpdate(id, updatedMemberData, { new: true }).exec();
  }

  async delete(id: string): Promise<Member> {
    return this.membersModel.findOneAndDelete({ _id: id }).exec();
  }
}
