import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'cms-contact-edit',
  standalone: true,
  imports: [ContactItemComponent, FormsModule, NgFor, NgIf],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent implements OnInit {
  @Input({ required: true }) id!: string;
  @ViewChild('form') contactForm!: NgForm;
  originalContact!: Contact;
  contact!: Contact;
  editMode: boolean = false;
  groupContacts: Contact[] | undefined;
  constructor(private router: Router, private contactService: ContactService) {}

  ngOnInit(): void {
    console.log(this.id);
    if (this.id == null) {
      this.editMode = false;
      return;
    }
    this.originalContact = this.contactService.getContact(this.id);
    console.log(this.originalContact);
    if (this.originalContact == null) {
      return;
    }
    this.editMode = true;
    this.contact = { ...this.originalContact };
    if (this.originalContact?.group)
      this.groupContacts = this.originalContact.group.slice();
    console.log('group contacts', this.groupContacts);
  }
  onCancel() {
    this.router.navigate(['/contacts']);
  }

  onRemoveItem(i: number) {}

  onSubmit() {
    console.log(this.contactForm);
    // const {  } = this.contactForm.value;
    const newContact: Contact = {
      ...this.contactForm.value,
    };
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }
}
