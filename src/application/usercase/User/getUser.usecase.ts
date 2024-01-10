import { UserRepository } from "../../repository/interface/UserRepository";

export class GetUser {
  constructor(private readonly userRepository: UserRepository) { }
  async execute(id: Input): Promise<Output> {
    const user = await this.userRepository.get({
      id: id
    });
    return {
      email: user.email.value,
      id: user.id,
      isEnabled: user.isEnabled,
      lastName: user.lastName,
      name: user.name,
      password: user.password.value,
      isAdmin: user.isAdmin,
      verificationCode: user.verificationCode,
      verificationDate: user.verificationDate
    }
  }
}

type Input = string
type Output = {
  id: string,
  name: string,
  lastName: string,
  email: string,
  password: string,
  isEnabled: boolean
  verificationDate?: Date | null,
  verificationCode?: string | null,
  isAdmin?: boolean
}