import { IBaseRepository } from "../IBaseRepository";

export class GenericRepository<T> {
  constructor(private readonly repository: IBaseRepository<T>) { }
  async save(input: T): Promise<void> {
    return this.repository.save(input);
  }

  async get(id: string): Promise<T> {
    return this.repository.get(id);
  }

  async getAll(): Promise<T[]> {
    return this.repository.getAll();
  }

  async update(id: string, input: T): Promise<void> {
    return this.repository.update(id, input);
  }
  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}