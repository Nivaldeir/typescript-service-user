import { v4 } from "uuid"
import { ThemeUserEnum } from "../../helper/enums"

export interface IUserSettings {
  userSettingsId: string
  theme: ThemeUserEnum
  languege: string
}
export class UserSettings {
  readonly userSettingsId: string
  readonly theme: ThemeUserEnum
  readonly languege: string
  constructor(readonly properties: IUserSettings) {
    this.userSettingsId = properties.userSettingsId ?? v4()
    this.theme = properties.theme
    this.languege = properties.languege
  }
}