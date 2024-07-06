// loans.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Loan, LoanSchema } from './schemas/loans.schema';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { BooksModule } from '../books/books.module';
import { MembersModule } from '../members/members.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Loan.name, schema: LoanSchema }]),
    BooksModule,  // Import BooksModule
    MembersModule, // Import MembersModule
  ],
  providers: [LoansService],
  controllers: [LoansController],
})
export class LoansModule {}
