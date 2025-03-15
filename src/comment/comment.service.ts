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

    createComment(postingId: string, comment: Comment): Promise<Comment> | string {
        if(comment.context?.trim() == "") {
            return "댓글 내용을 입력해주세요";
        }

        comment.postingId = postingId;
        comment.createdAt = new Date();

        const createdComment = new this.commentModel(comment);
        return createdComment.save();
    }

    updateComment(id: string, comment: Comment): Promise<Comment> | string {
        if(comment.context?.trim() == "") {
            return "댓글 내용을 입력해주세요";
        }

        return this.commentModel.findOneAndUpdate({ _id: id, author: comment.nickname }, {
            context: comment.context
        }).exec().then();
    }

    removeComment(id: string, comment: Comment): Promise<Comment> {
        return this.commentModel.deleteOne({ _id: id, author: comment.nickname }).exec().then();
    }
}