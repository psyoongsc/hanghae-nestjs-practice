import { Schema } from 'mongoose';

export const PostingSchema = new Schema({
    id: { type: Number },
    title: { type: String },
    context: { type: String },
    postedDatetime: { type: Date },
    author: { type: String },
    password: { type: String }
});