export interface IBaseRepository<T> {
  save(input: T): Promise<T>
  get(id: string): Promise<T>
  getAll(): Promise<T[]>
  update(id: string, input: T): Promise<void>
  delete(id: string): Promise<void>
}