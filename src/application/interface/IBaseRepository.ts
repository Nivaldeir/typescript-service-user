export interface IBaseRepository<T> {
  save(input: T): Promise<void>
  get(id: string): Promise<T>
  getAll(): Promise<T[]>
  update(input: T): Promise<void>
  delete(id: string): Promise<void>
}