import { Component, Input } from '@angular/core';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessagesType } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: true,
  imports: [MessageItemComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent {
  @Input({ required: true }) messages!: MessagesType;
}
