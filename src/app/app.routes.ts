import { Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { DocumentsComponent } from './documents/documents.component';
import { ContactsComponent } from './contacts/contacts.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/documents',
    pathMatch: 'full',
  },
  {
    path: 'messages',
    component: MessagesComponent,
  },
  {
    path: 'documents',
    component: DocumentsComponent,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
];
