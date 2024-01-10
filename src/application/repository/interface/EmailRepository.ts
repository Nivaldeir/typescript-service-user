export interface EmailRepository {
  send(email: string, body: object, subject: string, layout: string): Promise<void>;
}