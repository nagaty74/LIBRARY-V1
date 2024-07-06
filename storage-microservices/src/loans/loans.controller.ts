/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LoansService } from './loans.service';
import { Loan } from './schemas/loans.schema';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  async create(@Body() createLoanDto: any): Promise<Loan> {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  async findAll(): Promise<Loan[]> {
    return this.loansService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Loan> {
    return this.loansService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLoanDto: any): Promise<Loan> {
    return this.loansService.update(id, updateLoanDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Loan> {
    return this.loansService.delete(id);
  }
}
