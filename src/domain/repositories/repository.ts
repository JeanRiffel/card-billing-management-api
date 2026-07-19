export interface Repository<T> {
  findById(id: string): Promise<T>;
  create(data: T): Promise<T | null>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<T>): Promise<T>;
}