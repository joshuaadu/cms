import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { Document, DocumentsType, DocumentType } from '../document.model';
import { DocumentService } from '../document.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [DocumentItemComponent, RouterLink],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  // @Output() selectedDocumentEvent = new EventEmitter<DocumentType>();

  constructor(private documentService: DocumentService) {}
  // onSelectedDocument(document: DocumentType) {
  //   this.selectedDocumentEvent.emit(document);
  // }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent.subscribe(() => {
      this.documents = this.documentService.getDocuments();
    });
  }
}
