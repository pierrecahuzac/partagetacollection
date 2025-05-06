import { Test, TestingModule } from '@nestjs/testing';
import { ItemImageController } from './item-image.controller';
import { ItemImageService } from './item-image.service';

describe('ItemImageController', () => {
  let controller: ItemImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemImageController],
      providers: [ItemImageService],
    }).compile();

    controller = module.get<ItemImageController>(ItemImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
