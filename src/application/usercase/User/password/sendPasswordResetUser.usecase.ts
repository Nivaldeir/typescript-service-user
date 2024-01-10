import { EmailRepository } from "../../../repository/interface/EmailRepository";
import { UserRepository } from "../../../repository/interface/UserRepository";
import crypto from "crypto"

export class SendPasswordResetUser {
  constructor(private readonly userService: UserRepository, private readonly emailService: EmailRepository) { }
  async execute(input: Input): Promise<Output> {
    const [user] = await this.userService.show({
      email: [input.email]
    })
    if (!user) throw new Error("USER_NOT_FOUND");
    const token = crypto.randomBytes(20).toString("hex")
    const now = new Date();
    now.setHours(now.getHours() + 1);
    user.update({
      verificationCode: token,
      verificationDate: now
    })
    const forgotPassword = `https://localhost:3000/user/forgot-password/${token}`;
    await this.userService.update(user.id, user);
    await this.emailService.send(user.email.value, { url: forgotPassword }, "Resetar senha", "forgot_password")
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