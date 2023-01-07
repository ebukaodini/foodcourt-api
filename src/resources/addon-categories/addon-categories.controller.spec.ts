import { Test } from '@nestjs/testing';
import { AddonCategoriesController } from './addon-categories.controller';
import { AddonCategoriesService } from './addon-categories.service';
import { DatabaseModule } from '../../database/database.module';

describe('AddonsCategoriesController', () => {
  let addonCategoriesController: AddonCategoriesController;
  let addonCategoriesService: AddonCategoriesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [AddonCategoriesController],
      providers: [AddonCategoriesService],
    }).compile();

    addonCategoriesService = moduleRef.get<AddonCategoriesService>(
      AddonCategoriesService,
    );
    addonCategoriesController = moduleRef.get<AddonCategoriesController>(
      AddonCategoriesController,
    );
  });

  const body = {
    name: 'desert',
  };

  describe('create', () => {
    it('should Create a new category for meal addons for the specified brand.', async () => {
      const result = {
        category: {
          id: 1,
          brandId: 1,
          name: 'desert',
        },
      };

      jest
        .spyOn(addonCategoriesService, 'create')
        .mockReturnValue(result as any);

      const recieved = await addonCategoriesController.create(1, body);
      expect(recieved.category.brandId).toBe(1);
      expect(recieved.category.id).toBe(result.category.id);
      expect(recieved.category.name).toBe(result.category.name);
    });
  });
});
