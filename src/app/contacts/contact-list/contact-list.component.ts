import { Component, EventEmitter, Input, Output } from '@angular/core';
import { contacts, ContactsType } from '../../../dummy-data/contacts';
import { ContactItemComponent } from '../contact-item/contact-item.component';

@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [ContactItemComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent {
  @Input({ required: true }) contacts!: ContactsType;
  @Output() selectedContactEvent = new EventEmitter<ContactsType[0]>();

  onSelected(contact: ContactsType[0]) {
    this.selectedContactEvent.emit(contact);
  }
}
