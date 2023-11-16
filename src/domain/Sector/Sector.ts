import { v4 } from "uuid"

export interface ISector {
  sectorId: string
  name: string
  color?: string
  greetingMessage?: string
  queue: any[]
}

export class Sector {
  constructor(readonly props: ISector) {
    this.props.sectorId = props.sectorId ?? v4()
  }
}