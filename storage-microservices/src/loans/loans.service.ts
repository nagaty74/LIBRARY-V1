/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Loan } from './schemas/loans.schema';

@Injectable()
export class LoansService {
  constructor(@InjectModel(Loan.name) private readonly loanModel: Model<Loan>) {}

  async create(loanData: any): Promise<Loan> {
    const createdLoan = new this.loanModel(loanData);
    return createdLoan.save();
  }

  async findAll(): Promise<Loan[]> {
    return this.loanModel.find().exec();
  }

  async findOne(id: string): Promise<Loan> {
    return this.loanModel.findById(id).exec();
  }

  async update(id: string, updatedLoanData: any): Promise<Loan> {
    return this.loanModel.findByIdAndUpdate(id, updatedLoanData, { new: true }).exec();
  }

  async delete(id: string): Promise<Loan> {
    return this.loanModel.findOneAndDelete({ _id: id }).exec();
  }
}
