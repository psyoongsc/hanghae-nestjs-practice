export interface BaseRepository<T> {
    create(data: T): Promise<T>;
    update(id: string, data: T): Promise<T>;
    delete(id: string): Promise<boolean>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
}