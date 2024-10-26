import { Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { DocumentsComponent } from './documents/documents.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
  { path: '**', component: NotFoundComponent },
];
