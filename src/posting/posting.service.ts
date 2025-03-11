import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posting } from './interfaces/posting.interface'

@Injectable()
export class PostingService {
    constructor(@InjectModel('Posting') private readonly postingModel: Model<Posting>) {}
    private postings: Posting[] = [];
    private len: number = 0;

    createPosting(posting: Posting): Promise<Posting> {
        posting.id = ++this.len;
        posting.postedDatetime = new Date();

        const createdPosting = new this.postingModel(posting);
        return createdPosting.save();
    }

    getAllPostings(): Promise<Posting[]> {
        return this.postingModel.find().exec();
    }

    getPostingById(id: number): Promise<Posting[]> {
        return this.postingModel.find({id: id}).exec();
    }

    updatePosting(id: number, posting: Posting): Promise<Posting> {
        return this.postingModel.findOneAndUpdate({id: id, password: posting.password}, {
            title: posting.title,
            context: posting.context
        }).exec().then()

    }

    removePosting(id: number, posting: Posting): Promise<Posting> {
        return this.postingModel.findOneAndDelete({id: id, password: posting.password})
        .exec().then();
    }
}
