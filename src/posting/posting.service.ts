import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posting } from './interfaces/posting.interface'

@Injectable()
export class PostingService {
    constructor(@InjectModel('Posting') private readonly postingModel: Model<Posting>) {}

    createPosting(posting: Posting): Promise<Posting> {
        posting.postedDatetime = new Date();

        const createdPosting = new this.postingModel(posting);
        return createdPosting.save();
    }

    getAllPostings(): Promise<Posting[]> {
        return this.postingModel.find().exec();
    }

    getPostingById(id: string): Promise<Posting[]> {
        return this.postingModel.find({_id: id}).exec();
    }

    updatePosting(id: string, posting: Posting): Promise<Posting> {
        return this.postingModel.findOneAndUpdate({_id: id, password: posting.password}, {
            title: posting.title,
            context: posting.context
        }).exec().then()

    }

    removePosting(id: string, posting: Posting): Promise<Posting> {
        return this.postingModel.findOneAndDelete({_id: id, password: posting.password})
        .exec().then();
    }
}
