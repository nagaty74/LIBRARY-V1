import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'library';

  apiUrl: any = 'http://localhost:3000/';
  allItems: any = [];
  view: any;
  books: any;
  authors: any;
  members: any;
  loans: any;
  showEdit: boolean = false;
  showDeleteConfirmation: boolean = false;
  editedItem: any = {};
  addedItem: any = {};
  beingEditiedId: any;
  beingEditiedView: any;
  beingDeletedId: any;
  beingDeletedView: any;
  dataToSend: any = {};
  showAdd: any;
  searchItemName: any;
  found: boolean = false;
  foundItemDetails: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.setView('all');
    this.getAll();
  }

  getAll(): void {
    this.allItems = [];

    this.http.get(this.apiUrl + 'books').subscribe(
      (data) => {
        this.books = data;
        this.books.forEach((item: any) => {
          this.allItems.push(item);
        });
      });

    this.http.get(this.apiUrl + 'authors').subscribe(
      (data) => {
        this.authors = data;
        this.authors.forEach((item: any) => {
          this.allItems.push(item);
        });
      });

    this.http.get(this.apiUrl + 'members').subscribe(
      (data) => {
        this.members = data;
        this.members.forEach((item: any) => {
          this.allItems.push(item);
        });
      });

    this.http.get(this.apiUrl + 'loans').subscribe((data) => {
      this.loans = data;
      this.loans.forEach((item: any) => {
        this.allItems.push(item);
      });
    });
  }

  setView(view: string): void {
    this.view = view;
  }

  showEditForm(id: string, view: string) {
    this.showEdit = true;
    this.beingEditiedId = id;
    this.beingEditiedView = view;
    this.showAdd = false;
    this.showDeleteConfirmation = false;
  }

  cancelEditForm() {
    this.showEdit = false;
    this.beingEditiedId = '';
    this.beingEditiedView = '';
  }

  submitEditForm() {
    if (this.editedItem.name != '') { this.dataToSend['name'] = this.editedItem.name }
    if (this.editedItem.author != '') { this.dataToSend['author'] = this.editedItem.author }
    if (this.editedItem.publishedYear != '') { let stringValue: string = this.editedItem.publishedYear; let intValue: number = +stringValue; this.dataToSend['publishedYear'] = (Number.isNaN(intValue)) ? undefined : intValue }
    if (this.editedItem.genre != '') { this.dataToSend['genre'] = this.editedItem.genre }
    if (this.editedItem.photo != '') { this.dataToSend['photo'] = this.editedItem.photo }

    this.http.put(this.apiUrl + this.beingEditiedView + '/' + this.beingEditiedId, this.dataToSend).subscribe((response) => {
      this.getAll();
      this.showEdit = false;
      this.editedItem = {};
      this.beingEditiedId = '';
      this.beingEditiedView = '';
      this.dataToSend = {};
    });
  }

  askDeleteConfirmation(id: string, view: string) {
    this.showDeleteConfirmation = true;
    this.beingDeletedId = id;
    this.beingDeletedView = view;
    this.showAdd = false;
    this.showEdit = false;
  }

  confirmDelete() {
    this.http.delete(this.apiUrl + this.beingDeletedView + '/' + this.beingDeletedId).subscribe((response) => {
      this.getAll();
      this.showDeleteConfirmation = false;
      this.beingDeletedId = '';
      this.beingDeletedView = '';
    });
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
    this.beingDeletedId = '';
    this.beingDeletedView = '';
  }

  submitAddForm(): void {
    this.dataToSend = {};
  
    if (this.addedItem.view === 'books') {
      if (!this.addedItem.title || !this.addedItem.author || !this.addedItem.publishedYear || !this.addedItem.genre || !this.addedItem.photo) {
        alert('Please fill all the fields');
        return;
      }
      this.dataToSend = {
        title: this.addedItem.title,
        author: this.addedItem.author,
        publishedYear: parseInt(this.addedItem.publishedYear, 10),
        genre: this.addedItem.genre,
        photo: this.addedItem.photo
      };
    } else if (this.addedItem.view === 'authors') {
      if (!this.addedItem.name || !this.addedItem.bio || !this.addedItem.photo) {
        alert('Please fill all the fields');
        return;
      }
      this.dataToSend = {
        name: this.addedItem.name,
        bio: this.addedItem.bio,
        birthDate: new Date(this.addedItem.birthDate),
        photo: this.addedItem.photo // Add this line to include photo
      };
    } else if (this.addedItem.view === 'members') {
      if (!this.addedItem.name || !this.addedItem.membershipNumber || !this.addedItem.email || !this.addedItem.address || !this.addedItem.joinedDate || !this.addedItem.photo) {
        alert('Please fill all the fields');
        return;
      }
      this.dataToSend = {
        name: this.addedItem.name,
        membershipNumber: this.addedItem.membershipNumber,
        email: this.addedItem.email,
        address: this.addedItem.address,
        joinedDate: new Date(this.addedItem.joinedDate),
        photo: this.addedItem.photo // Add this line to include photo
      };
    } else if (this.addedItem.view === 'loans') {
      if (!this.addedItem.book || !this.addedItem.member || !this.addedItem.loanDate) {
        alert('Please fill all the fields');
        return;
      }
      this.dataToSend = {
        book: this.addedItem.book,
        member: this.addedItem.member,
        loanDate: new Date(this.addedItem.loanDate),
        returnDate: this.addedItem.returnDate ? new Date(this.addedItem.returnDate) : undefined
      };
    }
  
    this.http.post(this.apiUrl + this.addedItem.view, this.dataToSend).subscribe(() => {
      this.showAdd = false;
      this.getAll();
    });
  }
  

  cancelAddForm(): void {
    this.showAdd = false;
  }

  search(): any {
    this.foundItemDetails = this.allItems.filter((item: { title: string; }) => item.title.toLowerCase().includes(this.searchItemName.toLowerCase()));
    if (this.foundItemDetails.length != 0) {
      this.foundItemDetails = this.foundItemDetails[0];
      this.found = true;
    }
  }
}
