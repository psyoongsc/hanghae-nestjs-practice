import { Schema } from 'mongoose';

export const PostingSchema = new Schema({
    id: { type: Number, required: true },
    title: { type: String, required: false },
    context: { type: String, required: false },
    postedDatetime: { type: Date, required: true },
    author: { type: String, required: true },
    password: { type: String, required: true }
});