import { RepositoryFactory } from "../../../application/repository/factory/RepositoryFactory";
import { UserRepository } from "../../../application/repository/interface/UserRepository";
import { UserRepositoryDatabase } from "../repository/UserRepositoryDatabase";

export class RepositoryFactoryDatabase implements RepositoryFactory {
  constructor(private readonly connection: any) { }
  User(): UserRepository {
    return new UserRepositoryDatabase(this.connection)
  }
}