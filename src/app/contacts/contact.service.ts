import { EventEmitter, Injectable } from '@angular/core';
import { ContactsType } from '../../dummy-data/contacts';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  selectedContactEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    return this.contacts.find((contact) => contact.id === id) as Contact;
  }

  selectContact(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
}