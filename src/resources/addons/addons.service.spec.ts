import { Test, TestingModule } from '@nestjs/testing';
import { AddonsService } from './addons.service';
import { AddonCategoriesModule } from '../addon-categories/addon-categories.module';

describe('AddonsService', () => {
  let service: AddonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AddonCategoriesModule],
      providers: [AddonsService],
    }).compile();

    service = module.get<AddonsService>(AddonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
