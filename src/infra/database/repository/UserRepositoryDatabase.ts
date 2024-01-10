import { UserRepository } from "../../../application/repository/interface/UserRepository";
import { User } from "../../../domain/User";
import { GenericRepositoryDatabase } from "./GenericRepositoryDatabase";

export class UserRepositoryDatabase extends GenericRepositoryDatabase<User> implements UserRepository {
  constructor(private readonly client_: any) {
    super(User, client_.user);
  }
  async delete(id: string): Promise<void> {
    return await this.client_.user.update({
      where: {
        id: id,
      },
      data: {
        isEnable: false,
      }
    })
  }
}