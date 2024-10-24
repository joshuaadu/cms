// export class Message {
//   constructor(
//     public id: string,
//     public subject: string,
//     public msgText: string,
//     public sender: string
//   ) {}
// }

// export type MessageType = Message;
// export type MessagesType = Message[];

export interface Message {
  id: string;
  subject: string;
  msgText: string;
  sender: string;
}
