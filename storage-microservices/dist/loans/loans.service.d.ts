/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Model } from 'mongoose';
import { Loan } from './schemas/loans.schema';
import { Book } from '../books/schemas/books.schema';
import { Member } from '../members/schemas/member.schema';
export declare class LoansService {
    private readonly loanModel;
    private readonly bookModel;
    private readonly memberModel;
    constructor(loanModel: Model<Loan>, bookModel: Model<Book>, memberModel: Model<Member>);
    create(loanData: any): Promise<Loan>;
    findAll(): Promise<Loan[]>;
    findOne(id: string): Promise<Loan>;
    update(id: string, updatedLoanData: any): Promise<Loan>;
    delete(id: string): Promise<Loan>;
}
