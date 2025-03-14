import { Schema } from 'mongoose';

export const PostingSchema = new Schema({
    title: { type: String },
    context: { type: String },
    postedDatetime: { type: Date },
    nickname: { type: String },
    password: { type: String }
});