import { CreateUser, DeleteUser, GetUser, ShowUser, UpdateUser } from "../../usercase"
import { SendCodeActiveUser } from "../../usercase/User/Active/sendCodeActiveUser.usecase";
import { SendPasswordResetUser } from "../../usercase/User/password/sendPasswordResetUser.usecase";
import { VerifyTokenForActivation } from "../../usercase/User/Active/verifyTokenForActivation.usecase";
import { RepositoryFactory } from "./RepositoryFactory";
import { VerifyTokenForResetPassword } from "../../usercase/User/password/verifyTokenForResetPassword";
import { Authentication } from "../../usercase/User/authenticate.usecase";
import { UserRepository } from "../interface/UserRepository";
import { EmailRepository } from "../interface/EmailRepository";
import { CacheRepository } from "../interface/CacheRepository";

export class UsecaseFactory {
  private _user: UserRepository
  constructor(private readonly repositoryFactory: RepositoryFactory, private readonly _emailRepository: EmailRepository, private readonly _cacheRepository: CacheRepository) {
    this._user = this.repositoryFactory.User()
  }

  User() {
    return {
      save: new CreateUser(this._user, this._cacheRepository),
      get: new GetUser(this._user, this._cacheRepository),
      update: new UpdateUser(this._user),
      show: new ShowUser(this._user, this._cacheRepository),
      delete: new DeleteUser(this._user),
      sendCodeActive: new SendCodeActiveUser(this._user, this._emailRepository),
      activeUser: new VerifyTokenForActivation(this._user, this._emailRepository),
      sendCodePassword: new SendPasswordResetUser(this._user, this._emailRepository),
      forgotPassword: new VerifyTokenForResetPassword(this._user, this._emailRepository),
      authentication: new Authentication(this._user)
    }
  }
}