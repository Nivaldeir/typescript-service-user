import { IBaseRepository } from '../../interface/repository/IBaseRepository';

export class Save<T> {
  constructor(private readonly repository: IBaseRepository<T>) { }
  async execute(input: T): Promise<T> {
    const result = await this.repository.save(input);
    return result
  }
}