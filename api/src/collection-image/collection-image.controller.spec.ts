import { Test, TestingModule } from '@nestjs/testing';
import { CollectionImageController } from './collection-image.controller';
import { CollectionImageService } from './collection-image.service';

describe('CollectionImageController', () => {
  let controller: CollectionImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionImageController],
      providers: [CollectionImageService],
    }).compile();

    controller = module.get<CollectionImageController>(CollectionImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
