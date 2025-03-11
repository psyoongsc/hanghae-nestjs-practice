import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostingService } from './posting.service';
import { PostingController } from './posting.controller';
import { PostingSchema } from './schemas/posting.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Posting', schema: PostingSchema }]), // Register the model here
    ],
    controllers: [PostingController],
    providers: [PostingService]
})
export class PostingModule {}
