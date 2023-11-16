import crypto from 'crypto'
export class Password {
  private constructor (readonly value: string) { }
  static create (password: string): Password {
    const value = crypto.createHash('sha1').update(password).digest('hex')
    return new Password(value)
  }

  static restore (password: string): Password {
    return new Password(password)
  }

  validate (password: string): boolean {
    const value = crypto.createHash('sha1').update(password).digest('hex')
    return this.value === value
  }
}
