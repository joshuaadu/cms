import { Component } from '@angular/core';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { DocumentType } from './document.model';

@Component({
  selector: 'cms-documents',
  standalone: true,
  imports: [DocumentListComponent, DocumentDetailComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent {
  selectedDocument: DocumentType | undefined = undefined;
}
