import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as express from 'express';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.cert')
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  await app.listen(443);

  // HTTP 서버를 별도로 생성
  const httpApp = express();
  httpApp.use((req, res) => {
    const host = req.headers.host?.replace(/:\d+$/, ''); // 포트 제거
    res.redirect(`https://${host}${req.url}`);
  });

  // HTTP 요청을 80번 포트에서 수신
  httpApp.listen(80, () => {
    console.log('🚀 HTTP Server running on http://localhost and redirecting to HTTPS');
  });

  console.log('🚀 HTTPS Server running on https://localhost');
}
bootstrap();
