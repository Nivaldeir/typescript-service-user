import { User } from "../../../domain/User";
import { BaseRepository } from "./BaseRepository";

export interface UserRepository extends BaseRepository<User> {
}