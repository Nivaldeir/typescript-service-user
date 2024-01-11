import { User } from "../../../domain/User";
import { CacheRepository } from "../../repository/interface/CacheRepository";
import { UserRepository } from "../../repository/interface/UserRepository";

export class CreateUser {
    constructor(private readonly userRepository: UserRepository, private readonly cacheRepositoty: CacheRepository) { }
    async execute(input: any): Promise<Output> {
        const user = User.Create(input);
        await this.userRepository.save(user)
        await this.cacheRepositoty.Set(user.id, JSON.stringify(user))
        return {
            id: user.id
        }
    }
}

type Input = {
    name: string,
    lastName: string,
    email: string,
    password: string;
}
type Output = {
    id: string
}