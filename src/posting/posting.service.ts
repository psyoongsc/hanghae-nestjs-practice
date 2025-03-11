import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posting } from './interfaces/posting.interface'

@Injectable()
export class PostingService {
    constructor(@InjectModel('Posting') private readonly postingModel: Model<Posting>) {}
    private postings: Posting[] = [];
    private len: number = 0;

    createPosting(posting: Posting): Posting {
        posting.id = ++this.len;
        posting.postedDatetime = new Date();

        this.postings.push(posting);
        return posting;
    }

    // mongo 
    createPostingMongo(posting: Posting): Promise<Posting> {
        posting.id = ++this.len;
        posting.postedDatetime = new Date();

        const createdPosting = new this.postingModel(posting);
        return createdPosting.save();
    }

    getAllPostings(): Posting[] {
        return this.postings;
    }

    // mongo
    getAllPostingsMongo(): Promise<Posting[]> {
        return this.postingModel.find().exec();
    }

    getPostingById(id: number): Posting | undefined {
        return this.postings.find((posting) => posting.id == id);
    }

    updatePosting(id:number, posting: Posting): Posting | undefined {
        const edittingPosting = this.postings.find((item) => item.id == id);

        if(edittingPosting === undefined) {
            return undefined;
        }

        if(edittingPosting.password == posting.password) {
            edittingPosting.title = posting.title;
            edittingPosting.context = posting.context;

            return edittingPosting;
        }
        else {
            return undefined;
        }
    }

    removePosting(id: number, posting: Posting): Posting | undefined {
        const removingPosting = this.postings.find((item) => item.id == id);

        if(removingPosting === undefined) {
            return undefined;
        }

        if(removingPosting.password == posting.password) {
            this.postings = this.postings.filter((item) => item.id != id);

            return removingPosting;
        }
        else {
            return undefined;
        }
    }
}
