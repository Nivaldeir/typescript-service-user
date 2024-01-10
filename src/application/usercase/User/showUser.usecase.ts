import { User } from "../../../domain/User";
import { CacheRepository } from "../../repository/interface/CacheRepository";
import { UserRepository } from "../../repository/interface/UserRepository";
export class ShowUser {
    constructor(private readonly userRepository: UserRepository, private readonly cacheRepository: CacheRepository) { }
    async execute(input: Input): Promise<Output> {
        const cachedUser = await this.cacheRepository.Get("users")
        const page = input.page ?? 1
        const take = input.take ?? 10
        if (cachedUser) {
            return this.slice(page, take, JSON.parse(cachedUser))
        }
        const output = await this.userRepository.show(input)
        if (output) {
            const user = output?.map((e: User) => this.mapUser(e))
            await this.cacheRepository.Set("users", JSON.stringify(user))
            return user
        }
        return []
    }

    private async slice(page: number, take: number, data: any[]): Promise<any[]> {
        const first = (page - 1) * take
        const finish = first + take
        return data.slice(first, finish)
    }
    private mapUser(user: User): any {
        return {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email.value,
            isEnabled: user.isEnabled,
            isAdmin: user.isAdmin,
            verificationCode: user.verificationCode,
            verificationDate: user.verificationDate
        }
    }
}

type Input = {
    name?: string[],
    email?: string[]
    id?: string[]
    page?: number,
    take?: number
}
type Output = {
    id: string,
    name: string,
    lastName: string,
    email: string,
    isEnabled: boolean
    verificationDate?: Date | null,
    verificationCode?: string | null,
    isAdmin?: boolean
}[]