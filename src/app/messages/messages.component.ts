import { Component } from '@angular/core';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageEditComponent } from './message-edit/message-edit.component';
import { MessagesType, MessageType } from './message.model';

@Component({
  selector: 'cms-messages',
  standalone: true,
  imports: [MessageListComponent, MessageEditComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  messages: MessagesType = [];

  onAddMessage(message: MessageType) {
    this.messages.push(message);
  }
}
