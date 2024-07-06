import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from './schemas/member.schema';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  async create(@Body() createMemberDto: any): Promise<Member> {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  async findAll(): Promise<Member[]> {
    return this.membersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Member> {
    return this.membersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMemberDto: any): Promise<Member> {
    return this.membersService.update(id, updateMemberDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Member> {
    return this.membersService.delete(id);
  }

  @Get('search')
  async search(@Query('query') query: string): Promise<Member[]> {
    return this.membersService.search(query);
  }
}
