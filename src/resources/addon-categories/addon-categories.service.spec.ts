import { Test, TestingModule } from '@nestjs/testing';
import { AddonCategoriesService } from './addon-categories.service';
import { AddonCategoriesModule } from './addon-categories.module';

describe('AddonsCategoriesService', () => {
  let service: AddonCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AddonCategoriesModule],
      providers: [AddonCategoriesService],
    }).compile();

    service = module.get<AddonCategoriesService>(AddonCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
