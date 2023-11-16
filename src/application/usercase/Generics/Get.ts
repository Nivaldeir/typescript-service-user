import { IBaseRepository } from '../../interface/repository/IBaseRepository';

export class Get<T> {
  constructor(private readonly repository: IBaseRepository<T>) { }
  async execute(input: Input): Promise<T> {
    return await this.repository.get(input.id);
  }
}

type Input = {
  id: string
}