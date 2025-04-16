import { Test, TestingModule } from '@nestjs/testing';
import { CollectionStatusController } from './collection-status.controller';
import { CollectionStatusService } from './collection-status.service';

describe('CollectionStatusController', () => {
  let controller: CollectionStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionStatusController],
      providers: [CollectionStatusService],
    }).compile();

    controller = module.get<CollectionStatusController>(CollectionStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
