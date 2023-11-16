import { IBaseRepository } from '../../interface/repository/IBaseRepository';

export class Get<T> {
  constructor(private readonly repository: IBaseRepository<T>) { }
  async execute(id: string): Promise<T> {
    return await this.repository.get(id);
  }
}