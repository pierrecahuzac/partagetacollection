import { Test, TestingModule } from '@nestjs/testing';
import { ItemImageService } from './item-image.service';

describe('ItemImageService', () => {
  let service: ItemImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemImageService],
    }).compile();

    service = module.get<ItemImageService>(ItemImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
