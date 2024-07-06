import { MembersService } from './members.service';
import { Member } from './schemas/member.schema';
export declare class MembersController {
    private readonly membersService;
    constructor(membersService: MembersService);
    create(createMemberDto: any): Promise<Member>;
    findAll(): Promise<Member[]>;
    findOne(id: string): Promise<Member>;
    update(id: string, updateMemberDto: any): Promise<Member>;
    delete(id: string): Promise<Member>;
}
