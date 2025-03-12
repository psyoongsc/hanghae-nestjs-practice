import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './interfaces/comment.interface'

@Injectable()
export class CommentService {
    constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>) {}

    getAllComments(postingId: string): Promise<Comment[]> {
        return this.commentModel.find({ postingId: postingId }).sort({ createdAt: -1 }).exec();
    }

    createComment(postingId: string, comment: Comment): Promise<Comment> {
    createComment(postingId: string, comment: Comment): Promise<Comment> | string {
        if(comment.context?.trim() == "") {
            return "댓글 내용을 입력해주세요";
        }

        comment.postingId = postingId;
        comment.createdAt = new Date();

        const createdComment = new this.commentModel(comment);
        return createdComment.save();
    }

    updateComment(id: string, comment: Comment): Promise<Comment> {
        return this.commentModel.findOneAndUpdate({ id: id, author: comment.author }, {
            comment: comment.context
    updateComment(id: string, comment: Comment): Promise<Comment> | string {
        if(comment.context?.trim() == "") {
            return "댓글 내용을 입력해주세요";
        }

        }).exec().then();
    }

    removeComment(id: string, comment: Comment): Promise<Comment> {
        return this.commentModel.deleteOne({ id: id, author: comment.author }).exec().then();
    }
}