import { Component, Input } from '@angular/core';
import { Document, DocumentType } from '../document.model';
import { DocumentService } from '../document.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'cms-document-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css',
  host: {
    '(click)': 'onClick()',
  },
})
export class DocumentItemComponent {
  @Input({ required: true }) document!: Document;

  constructor(private documentService: DocumentService) {}

  onClick() {
    this.documentService.selectDocument(this.document);
  }
}
