import { BooksService } from './books.service';
import { Book } from './schemas/books.schema';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(createBookDto: any): Promise<Book>;
    findAll(): Promise<Book[]>;
    findOne(id: string): Promise<Book>;
    update(id: string, updateBookDto: any): Promise<Book>;
    delete(id: string): Promise<Book>;
}
