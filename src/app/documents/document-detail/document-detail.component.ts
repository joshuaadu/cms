import { Component, computed, input, Input, OnInit } from '@angular/core';
import { Document, DocumentType } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, RouterLink } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css',
})
export class DocumentDetailComponent implements OnInit {
  @Input({ required: true }) id!: string;
  nativeWindow: any;
  // id = input.required<string>();

  get document(): Document {
    return this.documentService.getDocument(this.id);
  }

  constructor(
    private documentService: DocumentService,
    private windowService: WindRefService,
    private router: Router
  ) {
    this.nativeWindow = this.windowService.getNativeWindow();
  }

  ngOnInit(): void {
    // this.document = this.documentService.getDocument(this.id());
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}
