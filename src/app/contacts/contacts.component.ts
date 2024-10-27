import { Component, OnInit } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { contacts, ContactsType } from '../../dummy-data/contacts';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cms-contacts',
  standalone: true,
  imports: [ContactListComponent, ContactDetailComponent, RouterOutlet],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  // selectedContact: Contact | undefined = undefined;
  // contacts: ContactsType = contacts;
  constructor(private contactService: ContactService) {}

  // ngOnInit(): void {
  //   this.contactService.selectedContactEvent.subscribe((contact: Contact) => {
  //     this.selectedContact = contact;
  //   });
  // }
  // constructor(id, name,  email, phone, imageUrl, group ) { }

  // onSelected(contactId: string) {
  //   this.selectedContact = contacts.find((contact) => contact.id === contactId);
  // }
}
