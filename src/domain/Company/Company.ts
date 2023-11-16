import { v4 } from "uuid"

export interface ICompany {
  companyId?: string
  users: string[]
  name: string
  logo_url?: string
  sector?: string[]
  whatsapp?: any
}
export class Company {
  readonly users: string[]
  readonly name: string
  readonly companyId?: string
  readonly logo_url?: string
  readonly sector?: string[]
  readonly whatsapp?: any
  constructor(properties: ICompany) {
    this.companyId = properties.companyId ?? v4();
    this.users = properties.users;
    this.name = properties.name;
    this.logo_url = properties.logo_url;
    this.sector = properties.sector;
    this.whatsapp = properties.whatsapp;
  }
  get(): ICompany {
    return {
      companyId: this.companyId,
      users: this.users,
      name: this.name,
      logo_url: this.logo_url,
      sector: this.sector,
      whatsapp: this.whatsapp
    }
  }
}
