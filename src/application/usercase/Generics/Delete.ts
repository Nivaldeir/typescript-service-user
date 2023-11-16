import { IBaseRepository } from '../../interface/repository/IBaseRepository';

export class Delete<T> {
  constructor(private readonly repository: IBaseRepository<T>) { }
  async execute(input: Input): Promise<void> {
    return await this.repository.delete(input.id);
  }
}
type Input = {
  id: string
}