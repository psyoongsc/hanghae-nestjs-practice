import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostingModule } from './posting/posting.module';

@Module({
  imports: [PostingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
