import { Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { contacts, ContactsType } from '../../dummy-data/contacts';

@Component({
  selector: 'cms-contacts',
  standalone: true,
  imports: [ContactListComponent, ContactDetailComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  selectedContact: ContactsType[0] | undefined = undefined;
  contacts: ContactsType = contacts;
  // constructor(id, name,  email, phone, imageUrl, group ) { }

  // onSelected(contactId: string) {
  //   this.selectedContact = contacts.find((contact) => contact.id === contactId);
  // }
}
