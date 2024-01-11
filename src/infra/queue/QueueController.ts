import { EmailRepository } from "../../application/repository/interface/EmailRepository";
import { Queue } from "./Queue";

export class QueueController {
  constructor(private queueService: Queue, private emailService: EmailRepository) {
    queueService.consume("emailSend", (input: any) => {
      const email = this.emailService.send(input.email, input.body, input.subject, input.layout)
      console.log(email)
    })
  }
}