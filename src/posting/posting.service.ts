import { Injectable } from '@nestjs/common';
import { Posting } from './interfaces/posting.interface'

@Injectable()
export class PostingService {
    private postings: Posting[] = [];
    private len: number = 0;

    createPosting(posting: Posting): Posting {
        posting.id = ++this.len;
        posting.postedDatetime = new Date();

        this.postings.push(posting);
        return posting;
    }

    getAllPostings(): Posting[] {
        return this.postings;
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
