import { Component, Input } from '@angular/core';
import { DocumentType } from '../document.model';

@Component({
  selector: 'cms-document-item',
  standalone: true,
  imports: [],
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css',
})
export class DocumentItemComponent {
  @Input({ required: true }) document!: DocumentType;
}
