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
  constructor(readonly props: ITicket) {
    this.props.ticketId = props.ticketId ?? v4()
  }
}