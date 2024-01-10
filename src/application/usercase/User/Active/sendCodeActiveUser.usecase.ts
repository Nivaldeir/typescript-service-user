import { EmailRepository } from "../../../repository/interface/EmailRepository";
import { UserRepository } from "../../../repository/interface/UserRepository";
import crypto from "crypto"

export class SendCodeActiveUser {
  constructor(private readonly userService: UserRepository, private readonly emailService: EmailRepository) { }
  async execute(input: Input): Promise<Output> {
    const user = await this.userService.get({
      email: input.email
    })
    if (!user || user.isEnabled) throw new Error("USER_NOT_FOUND_OR_THIS_ACTIVED");
    const token = crypto.randomBytes(20).toString("hex")
    const now = new Date();
    now.setHours(now.getHours() + 1);
    user.update({
      verificationCode: token,
      verificationDate: now
    })
    const activationUrl = `https://localhost:3000/user/active/${token}`;
    await this.userService.update(user.id, user);
    await this.emailService.send(user.email.value, { url: activationUrl }, "Ativar conta", "active")
    return {
      success: true
    }
  }
}

type Input = {
  email: string;
}
type Output = {
  success: boolean,
  message?: string
};