import { v4 } from "uuid"
import { StatusTicketEnum } from "../../helper/enums"

export interface ITicket {
  ticketId?: string
  userId: string
  companyId: string
  contact: string
  messages: string[]
  status: StatusTicketEnum

}

export class Ticket {
  ticketId: string
  userId: string
  companyId: string
  contact: string
  messages: string[]
  status: StatusTicketEnum

  constructor(readonly properties: ITicket) {
    this.ticketId = properties.ticketId ?? v4()
    this.userId = properties.userId
    this.companyId = properties.companyId
    this.contact = properties.contact
    this.messages = properties.messages
    this.status = properties.status
  }
}