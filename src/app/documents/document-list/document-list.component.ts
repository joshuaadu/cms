import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentItemComponent } from '../document-item/document-item.component';
import {  DocumentsType, DocumentType } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [DocumentItemComponent],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent {
  documents: DocumentsType = [
    {
      name: 'TypeScript Handbook',
      description: 'Comprehensive guide to the TypeScript language.',
      url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
      id: '1',
    },
    {
      name: 'Angular Documentation',
      description: 'Official Angular documentation and tutorials.',
      url: 'https://angular.io/docs',
      id: '2',
    },
    {
      name: 'MDN Web Docs',
      description: 'Resources for developers, by developers, from Mozilla.',
      url: 'https://developer.mozilla.org/',
      id: '3',
    },
    {
      name: 'JavaScript Info',
      description: 'Modern JavaScript tutorial.',
      url: 'https://javascript.info/',
      id: '4',
    },
    {
      name: 'CSS-Tricks',
      description: 'Tips, tricks, and techniques on using CSS.',
      url: 'https://css-tricks.com/',
      id: '5',
    },
    {
      name: 'FreeCodeCamp',
      description: 'Learn to code for free with interactive challenges.',
      url: 'https://www.freecodecamp.org/',
      id: '6',
    },
  ];
  @Output() selectedDocumentEvent = new EventEmitter<DocumentType>();

  onSelectedDocument(document: DocumentType) {
    this.selectedDocumentEvent.emit(document);
  }
}
