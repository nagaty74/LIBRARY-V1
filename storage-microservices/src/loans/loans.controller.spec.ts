import { Test, TestingModule } from '@nestjs/testing';
import { LoansService } from './loans.service';
import { getModelToken } from '@nestjs/mongoose';
import { Loan } from './schemas/loans.schema';

describe('LoansService', () => {
  let service: LoansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoansService,
        {
          provide: getModelToken(Loan.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LoansService>(LoansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
