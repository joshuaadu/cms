import { DestroyRef, EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = MOCKMESSAGES;
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId!: number;

  constructor(private httpClient: HttpClient, private destroyRef: DestroyRef) {
    const subscription = this.httpClient
      .get<Message[]>(
        'https://angular-cms-bf1a3-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe({
        next: (messages) => {
          console.log('messages', messages);
          this.messages = messages;

          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.emit(messages);
        },
        error(err) {
          console.log('Fetching Messages failed', err);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  storeMessages() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const subscription = this.httpClient
      .put<Message[]>(
        'https://angular-cms-bf1a3-default-rtdb.firebaseio.com/messages.json',
        this.messages,
        { headers }
      )
      .subscribe({
        next: (messages) => {
          console.log('Messages updated:', messages);
          this.messageChangedEvent.emit(messages);
        },
        error: (err) => console.error('Error updating messages:', err),
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  getMaxId(): number {
    let maxId = 0;

    this.messages.forEach((mes) => {
      const currentId = parseInt(mes.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    // console.log(maxId);
    return maxId;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message | null {
    return this.messages.find((message) => message.id === id) as Message;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    // this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
  }
}
