import { IBaseRepository } from '../../interface/repository/IBaseRepository';

export class GetAll<T> {
  constructor(private readonly repository: IBaseRepository<T>) { }
  async execute(): Promise<T[]> {
    const result = await this.repository.getAll();
    console.log(result)
    return result;
  }
}