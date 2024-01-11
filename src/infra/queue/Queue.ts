export interface Queue {
  connect(): Promise<void>;
  consume(name: string, callback: Function): Promise<void>;
  publish(name: string, data: any): Promise<void>;
}