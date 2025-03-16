import { Model } from 'mongoose';
//import { Repository } from 'typeorm';
import { MongoRepository } from './mongo.repository';
//import { MySQLRepository } from './mysql.repository';
import { BaseEntity } from 'src/entities/base.entity';

export class RepositoryFactory {
    static createMongoRepository<T extends BaseEntity>(model: Model<T>): MongoRepository<T> {
        return new MongoRepository<T>(model);
    }

    // static createMySQLRepository<T extends BaseEntity>(repository: Repository<T>): MySQLRepository<T> {
    //     return new MySQLRepository<T>(repository);
    // }
}
