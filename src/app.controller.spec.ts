import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard } from './user/login/jwt-auth.guard';

describe('AppController', () => {
  let app: TestingModule;
  let appController: AppController;
  let appService: AppService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get(AppController);
    appService = app.get(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      jest.spyOn(appService, 'getHello').mockImplementation(() => 'Hello World!');
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('getProtected', () => {
    it('should return "Protected Data"', () => {
      jest.spyOn(appService, 'getProtected').mockImplementation(() => 'Protected Data');
      expect(appController.getProtected()).toBe('Protected Data');
    });

    it('should be guarded by JwtAuthGuard', () => {
      const guards = Reflect.getMetadata('__guards__', appController.getProtected);
      const guard = new guards[0]();
      expect(guard).toBeInstanceOf(JwtAuthGuard);
    });
  });
}); 