import { CacheRepository } from "../../repository/interface/CacheRepository";
import { UserRepository } from "../../repository/interface/UserRepository";

export class GetUser {
  constructor(private readonly userRepository: UserRepository, private readonly cacheRepository: CacheRepository) { }
  async execute(id: Input): Promise<Output> {
    let cache = await this.cacheRepository.Get(id)
    if (cache) {
      return JSON.parse(cache)
    }
    let user = await this.userRepository.get({
      id: id
    });
    let userDto = {
      email: user.email.value,
      id: user.id,
      isEnabled: user.isEnabled,
      lastName: user.lastName,
      name: user.name,
      password: user.password.value,
      isAdmin: user.isAdmin,
      type: user.type,
      verificationCode: user.verificationCode,
      verificationDate: user.verificationDate
    }
    await this.cacheRepository.Set(id, JSON.stringify(userDto))
    return userDto
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
  type: string
}