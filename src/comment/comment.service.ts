import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './interfaces/comment.interface'

@Injectable()
export class CommentService {
    constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>) {}

    getAllComments(id: string): Promise<Comment[]> {
        return this.commentModel.find({ postingId: id }).exec();
    }
}