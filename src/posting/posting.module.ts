import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostingService } from './posting.service';
import { PostingController } from './posting.controller';
import { Posting, PostingSchema } from './schemas/posting.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Posting.name, schema: PostingSchema }], 'postings'),
    ],
    controllers: [PostingController],
    providers: [PostingService]
})
export class PostingModule {}
