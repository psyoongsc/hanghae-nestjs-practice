import { Schema } from 'mongoose';

export const CommentSchema = new Schema({
    id: { type: String },
    postingId: { type: String },
    nickname: { type: String },
    context: { type: String },
    createdAt: { type: Date }
});