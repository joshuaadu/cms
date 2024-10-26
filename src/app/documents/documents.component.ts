import { Component, OnInit } from '@angular/core';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { Document, DocumentType } from './document.model';
import { DocumentService } from './document.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cms-documents',
  standalone: true,
  imports: [DocumentListComponent, DocumentDetailComponent, RouterOutlet],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document | undefined = undefined;

  constructor(private documentService: DocumentService) {}
  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
    this.documentService.documentChangedEvent.subscribe(() => {
      this.selectedDocument = undefined;
    });
  }
}
