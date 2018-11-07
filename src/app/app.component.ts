import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

class Book {
    constructor(public name) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'firebaseTest';

  private itemsCollection: AngularFirestoreCollection<Book>;
  public books: Observable<Book[]>;
  public bookCounter = 0;

  constructor(private readonly db: AngularFirestore) {
    this.itemsCollection = db.collection('books');
    this.books = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void {
    this.books.subscribe(books => console.log(books));
  }

  onAdd() {
    const newBook = {
      name: `My book #${this.bookCounter++}`
    };
    const id = this.db.createId();
    this.itemsCollection.doc(id).set(newBook);
  }

}
