import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostingModule } from './posting/posting.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/postings', { connectionName: 'postings'}),
    MongooseModule.forRoot('mongodb://localhost/commets', { connectionName: 'comments' }),
    PostingModule, CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
