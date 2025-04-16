import { Test, TestingModule } from '@nestjs/testing';
import { CollectionStatusService } from './collection-status.service';

describe('CollectionStatusService', () => {
  let service: CollectionStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionStatusService],
    }).compile();

    service = module.get<CollectionStatusService>(CollectionStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
