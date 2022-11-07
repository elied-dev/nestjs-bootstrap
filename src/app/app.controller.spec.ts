import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Test root controller', () => {
    it('should return root message', () => {
      expect(appController.getRoot().message).toEqual(
        'Nothing to see here (app)',
      );
    });
  });
});
