import { Component } from '@angular/core';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageEditComponent } from './message-edit/message-edit.component';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'cms-messages',
  standalone: true,
  imports: [MessageListComponent, MessageEditComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  // messages: Message[] = [];
  constructor(private messageService: MessageService) {}

  onAddMessage(message: Message) {
    // this.messages.push(message);
    this.messageService.addMessage(message);
  }
}
