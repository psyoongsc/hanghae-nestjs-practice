import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostingModule } from './posting/posting.module';
import { CommentModule } from './comment/comment.module';
import { SignupModule } from './user/signup/signup.module';
import { HttpToHttpsMiddleware } from './middleware/http-to-https.middleware';
import { AuthModule } from './user/login/auth.module';
import * as cookieParser from 'cookie-parser';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/postings'),
    PostingModule, 
    CommentModule,
    SignupModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(HttpToHttpsMiddleware).forRoutes('*');
      consumer.apply(cookieParser()).forRoutes('*');
  }
}
