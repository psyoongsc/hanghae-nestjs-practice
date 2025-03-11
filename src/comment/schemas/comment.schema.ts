import { Schema } from 'mongoose';

export const CommentSchema = new Schema({
    id: { type: Number },
    postingId: { type: Number },
    author: { type: String },
    context: { type: String },
    createdAt: { type: Date }
});