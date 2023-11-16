import { Email } from '../Email/Email';
import { Password } from "../Password/Password"
import { v4 } from "uuid"

export interface IUser {
  userId: string
  name: string
  email: Email
  password: Password
  isAdmin?: boolean
  isActived?: boolean
  settings: any
  companyId: string
  sector: string[]
  ticket?: string[]
}

interface IUserRestore {
  userId: string
  name: string
  email: string
  password: string
  isAdmin?: boolean
  isActived?: boolean
  settings: any
  companyId: string
  sector: string[]
  ticket?: string[]
}
export class User {
  userId: string
  name: string
  email: Email
  password: Password
  isAdmin?: boolean
  isActived?: boolean
  settings: any
  companyId: string
  sector: string[]
  ticket?: string[]


  constructor(readonly properties: IUser) {
    this.userId = properties.userId
    this.name = properties.name
    this.email = properties.email
    this.password = properties.password
    this.isAdmin = properties.isAdmin ?? false
    this.isActived = properties.isActived ?? false
    this.settings = properties.settings
    this.companyId = properties.companyId
    this.sector = properties.sector
    this.ticket = properties.ticket
  }
  static create(name: string, email: string, password: string, companyId: string, sector: string[]): User {
    return new User({
      userId: v4(),
      name: name,
      email: new Email(email),
      password: Password.create(password),
      companyId: companyId,
      sector: sector,
      isAdmin: false,
      isActived: false,
      settings: {},
      ticket: [],
    })
  }
  static restore({ userId, name, email, password, isAdmin, isActived, settings, companyId, sector, ticket }: IUserRestore): User {
    return new User({ userId, name, email: new Email(email), password: Password.restore(password), isAdmin, isActived, settings, companyId, sector, ticket })
  }

  get() {
    return {
      userId: this.userId,
      name: this.name,
      email: this.email.value,
      password: this.password.value,
      isAdmin: this.isAdmin,
      isActived: this.isActived,
      settings: this.settings,
      companyId: this.companyId,
      sector: this.sector,
      ticket: this.ticket,
    }
  }
}