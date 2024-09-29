import { Component } from '@angular/core';
import { contacts, ContactsType } from '../../../dummy-data/contacts';

@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent {
  contacts: ContactsType = contacts;
}
