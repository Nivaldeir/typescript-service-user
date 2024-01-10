import axios, { Axios } from "axios";
import { EmailRepository } from "../../application/repository/interface/EmailRepository";

export class EmailExternal implements EmailRepository {
  instance: Axios;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3001",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      }
    })
  }
  async send(email: string, body: object, subject: string, layout: string): Promise<void> {
    return await this.instance.post("/send-mail", {
      email,
      body,
      subject,
      layout
    })
  }
}