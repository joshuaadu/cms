import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageType } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent {
  @Output() addMessageEvent = new EventEmitter<MessageType>();
  subject: string = '';
  msgText: string = '';
  currentSender = 'Joshua Adu-Mensah';

  onSendMessage() {
    if (this.subject !== '' && this.msgText !== '') {
      // console.log('Sending message: ' + this.message);
      this.addMessageEvent.emit({
        subject: this.subject,
        msgText: this.msgText,
        id: crypto.randomUUID(),
        sender: this.currentSender,
      });
      this.onClear();
    }
  }

  onClear() {
    // console.log(this.msgText, this.subject);
    this.subject = '';
    this.msgText = '';
  }
}
