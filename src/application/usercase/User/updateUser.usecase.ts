import { UserRepository } from "../../repository/interface/UserRepository";

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) { }
  async execute(id: string, input: Input): Promise<Output> {
    const user = await this.userRepository.get({
      id: id,
    });
    user.update(input)
    await this.userRepository.update(id, user);
  }
}

type Input = {
  isEnabled?: boolean,
  lastName?: string,
  name?: string,
  password?: string,
  isAdmin?: boolean,
  verificationCode?: string,
  verificationDate?: Date
}
type Output = void