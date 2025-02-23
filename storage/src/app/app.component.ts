import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'library';
  apiUrl: string = 'http://localhost:3000';
  books: any[] = [];
  authors: any[] = [];
  members: any[] = [];
  loans: any[] = [];
  view: string = 'books';
  showAdd: boolean = false;
  showEdit: boolean = false;
  showDeleteConfirmation: boolean = false;
  editedItem: any = {};
  addedItem: any = {};
  beingEditedId: string | null = null;
  beingDeletedId: string | null = null;
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllBooks();
    this.getAllAuthors();
    this.getAllMembers();
    this.getAllLoans();
  }

  getAllBooks(): void {
    const params = this.searchQuery ? new HttpParams().set('query', this.searchQuery) : new HttpParams();
    this.http.get<any[]>(`${this.apiUrl}/books`, { params }).subscribe(data => {
      this.books = data.map(book => ({
        ...book,
        isbn: book.isbn || ''  // Ensure ISBN is included, default to empty string if not available
      }));
    });
  }
  

  getAllAuthors(): void {
    const params = this.searchQuery ? new HttpParams().set('query', this.searchQuery) : new HttpParams();
    this.http.get<any[]>(`${this.apiUrl}/authors`, { params }).subscribe(data => {
      this.authors = data;
    });
  }

  getAllMembers(): void {
    const params = this.searchQuery ? new HttpParams().set('query', this.searchQuery) : new HttpParams();
    this.http.get<any[]>(`${this.apiUrl}/members`, { params }).subscribe(data => {
      this.members = data;
    });
  }

  getAllLoans(): void {
    const params = this.searchQuery ? new HttpParams().set('query', this.searchQuery) : new HttpParams();
    this.http.get<any[]>(`${this.apiUrl}/loans`, { params }).subscribe(data => {
      this.loans = data;
    });
  }

  search(): void {
    if (this.view === 'books') {
      this.getAllBooks();
    } else if (this.view === 'authors') {
      this.getAllAuthors();
    } else if (this.view === 'members') {
      this.getAllMembers();
    } else if (this.view === 'loans') {
      this.getAllLoans();
    }
  }

  submitAddForm(): void {
    let endpoint: string = '';
    let dataToSend: any = {};

    switch (this.addedItem.view) {
      case 'books':
        if (!this.addedItem.title || !this.addedItem.author || !this.addedItem.publishedYear || !this.addedItem.genre || !this.addedItem.isbn || !this.addedItem.photo) {
          alert('Please fill all the fields');
          return;
        }
        dataToSend = {
          title: this.addedItem.title,
          author: this.addedItem.author,
          publishedYear: parseInt(this.addedItem.publishedYear, 10),
          genre: this.addedItem.genre,
          isbn: this.addedItem.isbn,
          photo: this.addedItem.photo
        };
        endpoint = 'books';
        break;
      case 'authors':
        if (!this.addedItem.name || !this.addedItem.bio || !this.addedItem.birthDate || !this.addedItem.photo) {
          alert('Please fill all the fields');
          return;
        }
        dataToSend = {
          name: this.addedItem.name,
          bio: this.addedItem.bio,
          birthDate: new Date(this.addedItem.birthDate),
          photo: this.addedItem.photo
        };
        endpoint = 'authors';
        break;
      case 'members':
        if (!this.addedItem.name || !this.addedItem.membershipNumber || !this.addedItem.email || !this.addedItem.address || !this.addedItem.joinedDate || !this.addedItem.photo) {
          alert('Please fill all the fields');
          return;
        }
        dataToSend = {
          name: this.addedItem.name,
          membershipNumber: this.addedItem.membershipNumber,
          email: this.addedItem.email,
          address: this.addedItem.address,
          joinedDate: new Date(this.addedItem.joinedDate),
          photo: this.addedItem.photo
        };
        endpoint = 'members';
        break;
      case 'loans':
        if (!this.addedItem.book || !this.addedItem.member || !this.addedItem.loanDate) {
          alert('Please fill all the fields');
          return;
        }
        dataToSend = {
          book: this.addedItem.book,
          member: this.addedItem.member,
          loanDate: new Date(this.addedItem.loanDate),
          returnDate: this.addedItem.returnDate ? new Date(this.addedItem.returnDate) : undefined
        };
        endpoint = 'loans';
        break;
    }

    this.http.post(`${this.apiUrl}/${endpoint}`, dataToSend).subscribe(() => {
      this.showAdd = false;
      this.addedItem = {};
      this.search();
    });
  }

  showEditForm(id: string, view: string): void {
    this.showEdit = true;
    this.beingEditedId = id;
    this.view = view;
  }

  cancelEditForm(): void {
    this.showEdit = false;
    this.beingEditedId = null;
  }

  submitEditForm(): void {
    let endpoint: string = '';
    let dataToSend: any = {};

    switch (this.view) {
      case 'books':
        dataToSend = {
          title: this.editedItem.title,
          author: this.editedItem.author,
          publishedYear: parseInt(this.editedItem.publishedYear, 10),
          genre: this.editedItem.genre,
          photo: this.editedItem.photo
        };
        endpoint = 'books';
        break;
      case 'authors':
        dataToSend = {
          name: this.editedItem.name,
          bio: this.editedItem.bio,
          birthDate: new Date(this.editedItem.birthDate),
          photo: this.editedItem.photo
        };
        endpoint = 'authors';
        break;
      case 'members':
        dataToSend = {
          name: this.editedItem.name,
          membershipNumber: this.editedItem.membershipNumber,
          email: this.editedItem.email,
          address: this.editedItem.address,
          joinedDate: new Date(this.editedItem.joinedDate),
          photo: this.editedItem.photo
        };
        endpoint = 'members';
        break;
      case 'loans':
        dataToSend = {
          book: this.editedItem.book,
          member: this.editedItem.member,
          loanDate: new Date(this.editedItem.loanDate),
          returnDate: new Date(this.editedItem.returnDate)
        };
        endpoint = 'loans';
        break;
    }

    this.http.put(`${this.apiUrl}/${endpoint}/${this.beingEditedId}`, dataToSend).subscribe(() => {
      this.showEdit = false;
      this.editedItem = {};
      this.beingEditedId = null;
      this.search();
    });
  }

  askDeleteConfirmation(id: string, view: string): void {
    this.showDeleteConfirmation = true;
    this.beingDeletedId = id;
    this.view = view;
  }

  confirmDelete(): void {
    this.http.delete(`${this.apiUrl}/${this.view}/${this.beingDeletedId}`).subscribe(() => {
      this.showDeleteConfirmation = false;
      this.beingDeletedId = null;
      this.search();
    });
  }

  cancelDelete(): void {
    this.showDeleteConfirmation = false;
    this.beingDeletedId = null;
  }

  setView(view: string): void {
    this.view = view;
  }

  cancelAddForm(): void {
    this.showAdd = false;
    this.addedItem = {};
  }
}
