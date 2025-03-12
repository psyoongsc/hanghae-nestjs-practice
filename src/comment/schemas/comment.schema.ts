import { Schema } from 'mongoose';

export const CommentSchema = new Schema({
    id: { type: String },
    postingId: { type: String },
    author: { type: String },
    context: { type: String },
    createdAt: { type: Date }
});