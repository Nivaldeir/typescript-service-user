import { User } from "../../../domain/User";
import { UserRepository } from "../../repository/interface/UserRepository";

export class CreateUser {
    constructor(private readonly userRepository: UserRepository) { }
    async execute(input: any): Promise<Output> {
        const user = User.Create(input);
        await this.userRepository.save(user)
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