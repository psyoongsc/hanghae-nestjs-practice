import { Model } from "mongoose";
import { BaseEntity } from "src/entities/base.entity";

export class MongoRepository<T extends BaseEntity> {
    constructor(private readonly model: Model<T>) {}

    create(data: T, callback: (data: T) => void): Promise<T> {
        callback(data);
        data.createdAt = new Date();
        data.updatedAt = new Date();
        data.deletedAt = new Date('9999-12-31T23:59:59.999Z');

        const createdData = new this.model(data);
        return createdData.save();
    }

    update(id: string, data: T, callback: (id: string, data: T) => {}): Promise<T> {
        const condition = callback(id, data);
        data.updatedAt = new Date();

        return this.model.findOneAndUpdate(condition, data)
            .exec().then();
    }

    remove(id: string, data: T, callback: (id: string, data: T) => {}): Promise<T> {
        const condition = callback(id, data);

        return this.model
        .findOneAndUpdate(condition, 
            {deletedAt: new Date()})
            .exec().then();
    }

    getAll(findCondition: {}, sortCondition: {}): Promise<T[]> {
        return this.model
            .find({deletedAt: {$gt: new Date()}})
            .find(findCondition)
            .sort(sortCondition)
            .exec();
    }

    getById(id: string): Promise<T> {
        return this.model
            .findOne({_id: id, deletedAt: {$gt: new Date()}})
            .exec().then();
    }
}