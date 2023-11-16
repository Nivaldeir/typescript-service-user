import { IBaseRepository } from '../../interface/repository/IBaseRepository';

export class Update<T> {
  constructor(private readonly repository: IBaseRepository<T>) { }
  async execute(input: Input, data: T): Promise<void> {
    return await this.repository.update(input.id, data);
  }
}

type Input = {
  id: string
}