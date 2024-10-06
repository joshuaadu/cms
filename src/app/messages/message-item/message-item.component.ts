import { Component, Input } from '@angular/core';
import { MessageType } from '../message.model';

@Component({
  selector: 'cms-message-item',
  standalone: true,
  imports: [],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css',
})
export class MessageItemComponent {
  @Input({ required: true }) message!: MessageType;
  
}
