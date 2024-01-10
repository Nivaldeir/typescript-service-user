import { EmailRepository } from "../../../repository/interface/EmailRepository";
import { UserRepository } from "../../../repository/interface/UserRepository";

export class VerifyTokenForActivation {
  constructor(private readonly userService: UserRepository, private readonly emailService: EmailRepository) { }
  async execute(input: Input): Promise<void> {
    const user = await this.userService.get({
      email: input.email
    })
    if (!user) throw new Error("USER_NOT_FOUND");
    if (!this.isValidToken(input, user)) {
      throw new Error("TOKEN_NOT_VALID");
    }
    user.update({
      isEnabled: true,
      verificationCode: "",
    })
    await this.userService.update(user.id, user)
  }

  private isValidToken(input: Input, user: any): boolean {
    return input.token == user.verificationCode && new Date() < user["verificationDate"]
  }
}
type Input = {
  token: string;
  email: string;
}