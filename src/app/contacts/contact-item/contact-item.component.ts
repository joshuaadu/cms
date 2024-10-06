import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactsType } from '../../../dummy-data/contacts';

@Component({
  selector: 'cms-contact-item',
  standalone: true,
  imports: [],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css',
})
export class ContactItemComponent {
  @Input({ required: true }) contact!: ContactsType[0];
  // @Output() select = new EventEmitter<string>();

  // onClick() {
  //   this.select.emit(this.contact.id);
  //   console.log('Contact clicked' + this.contact.name);
  // }
}
