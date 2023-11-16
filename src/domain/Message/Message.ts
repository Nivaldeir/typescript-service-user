import { v4 } from "uuid"

export interface IMessage {
  messageId?: string;
  ticketId: string;
  message: string;
  date: Date;
}

export class Message {
  constructor(readonly props: IMessage) {
    this.props.messageId = props.messageId || v4();
  }
}