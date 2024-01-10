import { EmailRepository } from "../../repository/interface/EmailRepository";

export class SendEmail {
  constructor(private readonly emailService: EmailRepository) { }
  async execute(input: Input): Promise<void> {
    await this.emailService.send(input.email, input.body, input.subject, input.template);
  }
}

type Input = {
  email: string;
  body: object;
  subject: string;
  template: string;
}