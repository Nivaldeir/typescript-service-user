import { IBaseRepository } from '../../interface/repository/IBaseRepository';

export class GetAll<T> {
  constructor(private readonly repository: IBaseRepository<T>) { }
  async execute(): Promise<T[]> {
    return await this.repository.getAll();
  }
}