import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostingModule } from './posting/posting.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [PostingModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
