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
      .get<Document[]>('http://localhost:3000/documents')
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
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    // this.storeDocuments();
    this.httpClient
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe((response) => {
        this.documents.splice(pos, 1);
        this.documentListChangedEvent.next(this.documents);
        // this.sortAndSend();
      });
  }

  addDocument(newDocument: Document) {
    if (newDocument === null) {
      return;
    }
    // this.maxDocumentId++;
    // newDocument.id = this.maxDocumentId.toString();
    // this.documents.push(newDocument);
    // // const documentsListClone = this.documents.slice();
    // // this.documentListChangedEvent.next(documentsListClone);
    // this.storeDocuments();
    // make sure id of the new Document is empty
    newDocument.id = '';
    // console.log('new document', newDocument);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.httpClient
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        newDocument,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.documentListChangedEvent.next(this.documents);
        // this.sortAndSend();
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument == null || newDocument == null) return;

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    // this.storeDocuments();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.httpClient
      .put(
        'http://localhost:3000/documents/' + originalDocument.id,
        newDocument,
        { headers: headers }
      )
      .subscribe((response) => {
        this.documents[pos] = newDocument;
        this.documentListChangedEvent.next(this.documents);
        // this.sortAndSend();
      });
  }

  storeDocuments() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const subscription = this.httpClient
      .put<Document[]>('http://localhost:3000/documents', this.documents, {
        headers,
      })
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
