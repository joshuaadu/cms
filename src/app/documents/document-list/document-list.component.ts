import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { Document, DocumentsType, DocumentType } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [DocumentItemComponent],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent {
  @Input({ required: true }) documents!: DocumentsType;
  @Output() selectedContactEvent = new EventEmitter<DocumentType>();

  onSelected(document: DocumentType) {
    this.selectedContactEvent.emit(document);
  }
}
