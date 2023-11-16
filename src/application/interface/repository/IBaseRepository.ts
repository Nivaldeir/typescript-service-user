export interface IBaseRepository<T> {
  save(input: T): Promise<T>
  get(id: string): Promise<T>
  getAll(): Promise<T[]>
  update(id: string, data: T): Promise<T>
  delete(id: string): Promise<void>
}