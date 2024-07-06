import { LoansService } from './loans.service';
import { Loan } from './schemas/loans.schema';
export declare class LoansController {
    private readonly loansService;
    constructor(loansService: LoansService);
    create(createLoanDto: any): Promise<Loan>;
    findAll(): Promise<Loan[]>;
    findOne(id: string): Promise<Loan>;
    update(id: string, updateLoanDto: any): Promise<Loan>;
    delete(id: string): Promise<Loan>;
}
