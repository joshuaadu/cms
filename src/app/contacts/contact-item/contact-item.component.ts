import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactsType } from '../../../dummy-data/contacts';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-item',
  standalone: true,
  imports: [],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css',
  host: {
    '(click)': 'onClick()',
  },
})
export class ContactItemComponent {
  @Input({ required: true }) contact!: Contact;
  // @Output() select = new EventEmitter<string>();
  constructor(private contactService: ContactService) {}

  onClick() {
    this.contactService.selectContact(this.contact);
    // console.log('Contact clicked' + this.contact.name);
  }
}
