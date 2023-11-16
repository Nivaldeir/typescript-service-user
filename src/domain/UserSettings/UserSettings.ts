import { v4 } from "uuid"
import { ThemeUserEnum } from "../../helper/enums"

export interface IUserSettings {
  userSettingsId: string
  theme: ThemeUserEnum
  languege: string
}
export class UserSettings {
  constructor(readonly props: IUserSettings) {
    this.props.userSettingsId = props.userSettingsId ?? v4()
  }
}