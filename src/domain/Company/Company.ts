import { v4 } from "uuid"

export interface ICompany {
  companyId: string
  users: string[]
  name: string
  logo_url?: string
  sector?: string
  whatsapp?: any
}
export class Company {
  constructor(readonly props: ICompany) {
    this.props.companyId = props.companyId ?? v4()
  }
}
