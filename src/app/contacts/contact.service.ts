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
  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
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

    this.contacts = this.contacts.filter((c) => c.id !== contact.id);
    this.contactChangedEvent.emit(this.contacts.slice());

    // const pos = this.contacts.indexOf(contact);
    // if (pos < 0) {
    //   return;
    // }
    // this.contacts.splice(pos, 1);
  }
}
