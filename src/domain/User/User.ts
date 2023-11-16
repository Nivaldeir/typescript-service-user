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
  sector: string
  ticket: string[]
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
  sector: string
  ticket: string[]
}
export class User {
  constructor(readonly props: IUser) { }
  static create(name: string, email: string, password: string, companyId: string, sector: string): User {
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
}