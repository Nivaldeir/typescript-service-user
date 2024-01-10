export class UserException extends Error {
  constructor(message: string, private readonly userId: string) {
    super(message);
    this.name = "UserException"
    this.userId = userId;
  }
}