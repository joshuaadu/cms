import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit {
  @Input({ required: true }) id!: string;
  @ViewChild('form') documentForm!: NgForm;
  originalDocument!: Document;
  document!: Document;
  editMode: boolean = false;

  constructor(
    private documentServive: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.id == null) {
      this.editMode = false;
      return;
    }
    this.originalDocument = this.documentServive.getDocument(this.id);
    // console.log(this.originalDocument);
    if (this.originalDocument == null) {
      return;
    }
    this.editMode = true;
    this.document = { ...this.originalDocument };
  }
  onCancel() {
    this.router.navigate(['/documents']);
  }

  // onSubmit(form: any) {
  //   console.log(form);
  // }
  onSubmit() {
    console.log(this.documentForm);
    const { description, name, url } = this.documentForm.value;
    const newDocument: Document = {
      url: url as string,
      children: [],
      description: '',
      name: '',
      ...this.documentForm.value,
    };

    if (this.editMode) {
      this.documentServive.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentServive.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }
}
