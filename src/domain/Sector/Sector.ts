import { v4 } from "uuid"

export interface ISector {
  sectorId: string
  name: string
  color?: string
  greetingMessage?: string
  queue: any[]
}

export class Sector {
  readonly sectorId: string
  readonly name: string
  readonly color?: string
  readonly greetingMessage?: string
  readonly queue: any[]

  constructor(readonly properties: ISector) {
    this.sectorId = properties.sectorId ?? v4()
    this.name = properties.name
    this.color = properties.color
    this.greetingMessage = properties.greetingMessage
    this.queue = properties.queue
  }
}