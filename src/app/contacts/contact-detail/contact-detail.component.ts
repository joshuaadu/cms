import { Component, Input } from '@angular/core';
import { contacts, ContactsType } from '../../../dummy-data/contacts';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, RouterLink } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-contact-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css',
})
export class ContactDetailComponent {
  selectedContact: Contact | undefined = undefined;
  @Input()
  set id(id: string) {
    this.selectedContact = this.contactService.getContact(id);
  }

  constructor(
    private contactService: ContactService,
    private router: Router,
    private windowService: WindRefService
  ) {}

  onDelete() {
    this.contactService.deleteContact(this.selectedContact!);
    this.router.navigate(['/contacts']);
  }
  // onEdit() {
  //   this.router.navigate(['/contacts', this.selectedContact.id, 'edit']);
  // }
}
