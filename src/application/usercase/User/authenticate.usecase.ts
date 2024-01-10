import { UserRepository } from "../../repository/interface/UserRepository";
import { Token } from "../../../domain/Token";
import { UserException } from "../../../utils/Error/UserException";

export class Authentication {
  constructor(private readonly authService: UserRepository) { }
  async execute(input: Input): Promise<Output> {
    const user = await this.authService.get({
      email: input.email
    });
    if (!user) throw new UserException("USER_NOT_FOUND", input.email);
    if (user.password.validate(input.password)) {
      const token = Token.Sign(user.get())
      return {
        token: token
      };
    }
    throw new Error("NOT_AUTENTHICATED")
  }
}

type Input = {
  email: string,
  password: string,
}

type Output = {
  token: string
}