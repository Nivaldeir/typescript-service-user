import { IBaseRepository } from '../../interface/repository/IBaseRepository';

export class Save<T> {
  constructor(private readonly repository: IBaseRepository<T>) { }
  async execute(input: T): Promise<void> {
    return await this.repository.save(input);
  }
}