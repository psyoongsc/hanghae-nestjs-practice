import { BaseEntity } from "./base.entity";

export class UserEntity extends BaseEntity {
    nickname: string;
    password: string;
}