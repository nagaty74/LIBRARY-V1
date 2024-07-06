import { AuthorsService } from './authors.service';
import { Author } from './schemas/authors.schema';
export declare class AuthorsController {
    private readonly authorsService;
    constructor(authorsService: AuthorsService);
    create(createAuthorDto: any): Promise<Author>;
    findAll(): Promise<Author[]>;
    findOne(id: string): Promise<Author>;
    update(id: string, updateAuthorDto: any): Promise<Author>;
    delete(id: string): Promise<Author>;
}
