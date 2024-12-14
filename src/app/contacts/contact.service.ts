import { DestroyRef, EventEmitter, Injectable } from '@angular/core';
import { ContactsType } from '../../dummy-data/contacts';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  selectedContactEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId!: number;

  constructor(private httpClient: HttpClient, private destroyRef: DestroyRef) {
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();

    const subscription = this.httpClient
      .get<Contact[]>(
        'https://angular-cms-bf1a3-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe({
        next: (contacts) => {
          console.log(contacts);
          this.contacts = contacts;

          this.maxContactId = this.getMaxId();
          this.contactListChangedEvent.next(contacts);
        },
        error(err) {
          console.log('Fetching Contacts failed', err);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
    // console.log(this.maxContactId);
  }

  storeContacts() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const subscription = this.httpClient
      .put<Contact[]>(
        'https://angular-cms-bf1a3-default-rtdb.firebaseio.com/contacts.json',
        this.contacts,
        { headers }
      )
      .subscribe({
        next: (contacts) => {
          console.log('Contacts updated:', contacts);
          this.contactListChangedEvent.next(contacts);
        },
        error: (err) => console.error('Error updating contacts:', err),
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id) as Contact;
  }

  selectContact(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    // this.contacts = this.contacts.filter((c) => c.id !== contact.id);
    // this.contactChangedEvent.emit(this.contacts.slice());

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    // this.contactChangedEvent.emit(this.contacts.slice());
    // const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  addContact(newContact: Contact) {
    if (newContact === null) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    // const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact == null || newContact == null) return;

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    // const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;

    this.contacts.forEach((doc) => {
      const currentId = parseInt(doc.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    // console.log(maxId);
    return maxId;
  }
}
