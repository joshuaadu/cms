import { Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { DocumentsComponent } from './documents/documents.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';

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
    children: [
      {
        path: 'new',
        component: DocumentEditComponent,
      },
      {
        path: ':id',
        component: DocumentDetailComponent,
      },
      {
        path: ':id/edit',
        component: DocumentEditComponent,
      },
    ],
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    children: [
      {
        path: 'new',
        component: ContactEditComponent,
      },
      {
        path: ':id',
        component: ContactDetailComponent,
      },
      {
        path: ':id/edit',
        component: ContactEditComponent,
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
