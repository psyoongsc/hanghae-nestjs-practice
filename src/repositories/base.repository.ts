export interface BaseRepository<T> {
    create(data: T, callback: (data: T) => void): Promise<T>;
    update(id: string, data: T, callback: (id: string, data: T) => {}): Promise<T>;
    delete(id: string, data: T, callback: (id: string, data: T) => {}): Promise<T>
    findAll(findCondition: {}, sortCondition: {}): Promise<T[]>
    findById(id: string): Promise<T>;
}