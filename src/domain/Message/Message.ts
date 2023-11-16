import { v4 } from "uuid"

export interface IMessage {
  messageId?: string;
  ticketId: string;
  message: string;
  date: Date;
}

export class Message {
  readonly messageId?: string;
  readonly ticketId: string;
  readonly message: string;
  readonly date: Date;
  constructor(readonly properties: IMessage) {
    this.messageId = properties.messageId || v4();
    this.ticketId = properties.ticketId;
    this.message = properties.message;
    this.date = properties.date;
  }
  get(): IMessage {
    return {
      messageId: this.messageId,
      ticketId: this.ticketId,
      message: this.message,
      date: this.date
    }
  }
}