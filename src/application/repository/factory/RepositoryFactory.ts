import { UserRepository } from '../interface/UserRepository';
export interface RepositoryFactory {
  User(): UserRepository
}