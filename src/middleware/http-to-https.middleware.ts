import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpToHttpsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.secure) {
      // HTTPS가 아닐 경우 리다이렉트
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  }
}
