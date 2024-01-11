import { randomUUID } from "crypto"
import { Email } from "./Email"
import { Password } from "./Password"

export type IUser = {
  id: string,
  name: string,
  lastName: string,
  email: string,
  password: string,
  isEnabled: boolean,
  verificationCode?: string | ''
  verificationDate?: Date,
  isAdmin?: boolean
  type: "Student" | "Teacher"
}

export class User {
  id: string
  name: string
  lastName: string
  email: Email
  password: Password
  isEnabled: boolean
  verificationCode?: string
  verificationDate?: Date | null
  isAdmin?: boolean
  type: "Student" | "Teacher"

  constructor(user: IUser) {
    this.id = user.id
    this.email = new Email(user.email)
    this.lastName = user.lastName
    this.name = user.name
    this.password = Password.restore(user.password)
    this.isEnabled = user.isEnabled
    this.verificationCode = user.verificationCode
    this.verificationDate = user.verificationDate
    this.isAdmin = user.isAdmin
    this.type = user.type
  }

  static Create(user: Omit<IUser, "id" | "isEnabled">): User {
    const id = randomUUID()
    const password = Password.create(user.password).value
    return new User({ ...user, password, id, isEnabled: false });
  }
  get() {
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      email: this.email.value,
      password: this.password.value,
      isEnabled: this.isEnabled,
      verificationDate: this.verificationDate,
      verificationCode: this.verificationCode,
      isAdmin: this.isAdmin,
      type: this.type
    }
  }
  update(user: Partial<Omit<IUser, "id">>) {
    this.lastName = user.lastName ?? this.lastName
    this.name = user.name ?? this.name
    this.password = user.password ? Password.create(user.password) : this.password
    this.isEnabled = user.isEnabled ?? this.isEnabled
    this.verificationCode = user.verificationCode ?? this.verificationCode
    this.verificationDate = user.verificationDate ?? null
    this.isAdmin = user.isAdmin ?? false
    this.type = user.type ?? this.type
  }
}