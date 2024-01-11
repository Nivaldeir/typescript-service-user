import axios, { Axios } from "axios";
import { EmailRepository } from "../../application/repository/interface/EmailRepository";
import { Queue } from "../queue/Queue";

export class EmailExternal implements EmailRepository {
  instance: Axios;
  constructor(private readonly queue: Queue) {
    this.instance = axios.create({
      baseURL: "http://localhost:3001",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      }
    })
  }
  async send(email: string, body: object, subject: string, layout: string): Promise<void> {
    this.sendToQueue(email, body, subject, layout)
    // return await this.instance.post("/send-mail", {
    //   email,
    //   body,
    //   subject,
    //   layout
    // })
  }
  async sendToQueue(email: string, body: object, subject: string, layout: string): Promise<void> {

    await this.queue.publish("sendEmail", {
      email,
      body,
      subject,
      layout
    })
  }
}