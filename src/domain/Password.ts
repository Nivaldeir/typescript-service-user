import crypto from "crypto"
export class Password {
  constructor(readonly value: string) { }
  static create(password: string) {
    const value = crypto.createHash('sha256').update(password).digest('hex');
    return new Password(value);
  }
  static restore(password: string) {
    return new Password(password);
  }
  validate(password: string): Boolean {
    const value = crypto.createHash('sha256').update(password).digest('hex');
    return this.value == value
  }
}