export interface BaseRepository<T> {
  get(params: InputGet): Promise<T>
  show(params?: InputShow): Promise<T[]>
  save(data: T): Promise<void>
  delete(id: string): Promise<void>
  update(id: string, data: T): Promise<void>
}

type InputGet = {
  [key: string]: string
}

type InputShow = {
  id?: string[];
  email?: string[];
  name?: string[];
  page?: number;
  take?: number;
}