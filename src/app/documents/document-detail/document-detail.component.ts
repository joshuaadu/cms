import { Component, Input } from '@angular/core';
import { DocumentType } from '../document.model';

@Component({
  selector: 'cms-document-detail',
  standalone: true,
  imports: [],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css',
})
export class DocumentDetailComponent {
  @Input({ required: false }) document: DocumentType | undefined = undefined;
}
