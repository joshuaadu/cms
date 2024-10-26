import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessagesComponent } from './messages/messages.component';

@Component({
  selector: 'cms-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ContactsComponent,
    DocumentsComponent,
    MessagesComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cms';
  selectedFeature = 'documents';

  switchView(selectedFeature: string) {
    console.log(selectedFeature);
    this.selectedFeature = selectedFeature;
  }
}
