import { Test, TestingModule } from '@nestjs/testing';
import { CollectionImageService } from './collection-image.service';

describe('CollectionImageService', () => {
  let service: CollectionImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionImageService],
    }).compile();

    service = module.get<CollectionImageService>(CollectionImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
