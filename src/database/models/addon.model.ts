import { Model } from 'objection';
import { AddonCategoryModel } from './addon-category.model';
import { BaseModel } from './base.model';
import { BrandModel } from './brand.model';

export class AddonModel extends BaseModel {
  static tableName = 'addons';

  brandId: number;
  name: string;
  description?: string;
  price: number;
  categoryId?: number;
  createdAt: Date;
  updatedAt: Date;

  brand: BrandModel;
  category: AddonCategoryModel;

  static relationMappings = {
    brand: {
      modelClass: `${__dirname}/brand.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'addons.brandId',
        to: 'brands.id',
      },
    },
    category: {
      modelClass: `${__dirname}/addon-category.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'addons.categoryId',
        to: 'addon-categories.id',
      },
    },
  };
}
