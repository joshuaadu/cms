import { DestroyRef, EventEmitter, Injectable, OnInit } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService implements OnInit {
  private documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId!: number;

  constructor(private httpClient: HttpClient, private destroyRef: DestroyRef) {
    // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
    console.log('constructor');
    const subscription = this.httpClient
      .get<Document[]>(
        'https://angular-cms-bf1a3-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe({
        next: (documents) => {
          console.log(documents);
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(documents);
        },
        error(err) {
          console.log('Fetching Documents failed', err);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    console.log('on init');
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find((document) => document.id === id) as Document;
  }

  selectDocument(document: Document) {
    this.documentSelectedEvent.emit(document);
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    // this.documentChangedEvent.emit(this.documents.slice());
    const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }

  addDocument(newDocument: Document) {
    if (newDocument === null) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument == null || newDocument == null) return;

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }

  storeDocuments() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const subscription = this.httpClient
      .put<Document[]>(
        'https://angular-cms-bf1a3-default-rtdb.firebaseio.com/documents.json',
        this.documents,
        { headers }
      )
      .subscribe({
        next: (documents) => {
          console.log('Documents updated:', documents);
          this.documentListChangedEvent.next(documents);
        },
        error: (err) => console.error('Error updating documents:', err),
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  getMaxId(): number {
    let maxId = 0;

    this.documents.forEach((doc) => {
      const currentId = parseInt(doc.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }
}
