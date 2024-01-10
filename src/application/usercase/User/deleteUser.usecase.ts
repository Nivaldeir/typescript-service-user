import { UserRepository } from "../../repository/interface/UserRepository";

export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) { }
  async execute(id: Input) {
    await this.userRepository.delete(id)
  }
}

type Input = string