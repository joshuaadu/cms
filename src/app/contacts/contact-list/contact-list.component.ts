import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { contacts, ContactsType } from '../../../dummy-data/contacts';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ContactsFilterPipe } from '../contacts-filter.pipe';

@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [ContactItemComponent, RouterLink, FormsModule, ContactsFilterPipe],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  subscription!: Subscription;
  term: string = '';
  // @Output() selectedContactEvent = new EventEmitter<Contact>();
  constructor(private contactService: ContactService) {}

  // onSelected(contact: Contact) {
  //   this.selectedContactEvent.emit(contact);
  // }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    // this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
    //   this.contacts = contacts;
    // });

    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactsList: Contact[]) => {
        this.contacts = contactsList;
      }
    );
  }

  search(value: string) {
    this.term = value;

    console.log(this.term);
  }
}
