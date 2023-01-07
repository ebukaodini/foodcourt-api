import { Test } from '@nestjs/testing';
import { AddonsController } from './addons.controller';
import { AddonsService } from './addons.service';
import { AddonCategoriesModule } from '../addon-categories/addon-categories.module';

describe('AddonsController', () => {
  let addonsController: AddonsController;
  let addonsService: AddonsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AddonCategoriesModule],
      controllers: [AddonsController],
      providers: [AddonsService],
    }).compile();

    addonsService = moduleRef.get<AddonsService>(AddonsService);
    addonsController = moduleRef.get<AddonsController>(AddonsController);
  });

  const body = {
    name: 'egg',
    description: 'extra egg',
    price: 100,
    category: 'extras',
  };

  describe('create', () => {
    it('should create a new meal addon for the specified brand.', async () => {
      const result = {
        addon: {
          brandId: 1,
          categoryId: 1,
          name: 'egg',
          price: 100,
          description: 'extra egg',
          id: 1,
        },
      };

      jest.spyOn(addonsService, 'create').mockReturnValue(result as any);

      const recieved = await addonsController.create(1, body);
      expect(recieved.addon.brandId).toBe(1);
      expect(recieved.addon.id).toBe(result.addon.id);
      expect(recieved.addon.categoryId).toBe(result.addon.categoryId);
      expect(recieved.addon.name).toBe(result.addon.name);
      expect(recieved.addon.description).toBe(result.addon.description);
    });
  });

  describe('findAll', () => {
    it('should retrieve a list of all meal addons for the specified brand.', async () => {
      const result = {
        addons: [
          {
            brandId: 1,
            categoryId: 1,
            name: 'egg',
            price: 100,
            description: 'extra egg',
            id: 1,
          },
        ],
      };

      jest.spyOn(addonsService, 'findAll').mockReturnValue(result as any);

      const recieved = await addonsController.findAll(1);
      expect(recieved.addons.length).toBe(1);
      expect(recieved.addons[0].id).toBe(result.addons[0].id);
    });
  });

  describe('findOne', () => {
    it('should retrieve a single meal addon by its ID for the specified brand.', async () => {
      const result = {
        addon: {
          brandId: 1,
          categoryId: 1,
          name: 'eggs',
          price: 100,
          description: 'extra egg',
          id: 1,
        },
      };

      jest.spyOn(addonsService, 'findOne').mockReturnValue(result as any);

      const recieved = await addonsController.findOne(1, 1);
      expect(recieved.addon.id).toBe(result.addon.id);
    });
  });

  describe('update', () => {
    it('should update a single meal addon by its ID for the specified brand.', async () => {
      const result = {
        addon: {
          brandId: 1,
          categoryId: 1,
          name: 'egg',
          price: 100,
          description: 'extra egg',
          id: 1,
        },
      };

      jest.spyOn(addonsService, 'update').mockReturnValue(result as any);

      const recieved = await addonsController.update(1, 1, body);
      expect(recieved.addon.id).toBe(result.addon.id);
      expect(recieved.addon.name).toBe(result.addon.name);
    });
  });

  describe('remove', () => {
    it('should delete a single meal addon by its ID for the specified brand.', async () => {
      const result = {
        addon: {
          brandId: 1,
          categoryId: 1,
          name: 'egg',
          price: 100,
          description: 'extra egg',
          id: 1,
        },
      };

      jest.spyOn(addonsService, 'remove').mockReturnValue(result as any);

      const recieved = await addonsController.remove(1, 1);
      expect(recieved.addon.id).toBe(result.addon.id);
    });
  });
});
