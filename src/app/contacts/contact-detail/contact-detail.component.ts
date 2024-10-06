import { Component, Input } from '@angular/core';
import { contacts, ContactsType } from '../../../dummy-data/contacts';

@Component({
  selector: 'cms-contact-detail',
  standalone: true,
  imports: [],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css',
})
export class ContactDetailComponent {
  @Input() selectedContact: ContactsType[0] | undefined = undefined;
}
