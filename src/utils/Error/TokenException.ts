export class TokenException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TokenException"
  }
}