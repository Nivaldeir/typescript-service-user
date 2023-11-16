import { IBaseRepository } from '../../interface/repository/IBaseRepository';

export class Update<T> {
  constructor(private readonly repository: IBaseRepository<T>) { }
  async execute(id: string, data: T): Promise<T> {
    return await this.repository.update(id, data);
  }
}
