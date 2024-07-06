import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { MembersModule } from './members/members.module';
import { LoansModule } from './loans/loans.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTIONSTRING),
    BooksModule,
    AuthorsModule,
    MembersModule,
    LoansModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
