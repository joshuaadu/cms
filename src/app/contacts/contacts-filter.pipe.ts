import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: true,
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): Contact[] {
    const filteredList = contacts.filter((contact) =>
      contact.name?.toLowerCase()?.includes(term?.toLowerCase())
    );
    return filteredList?.length ? filteredList : contacts;
  }
}
