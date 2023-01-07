import { Model } from 'objection';
import { BaseModel } from './base.model';
import { BrandModel } from './brand.model';

export class AddonCategoryModel extends BaseModel {
  static tableName = 'addon-categories';

  brandId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  brand: BrandModel;

  static relationMappings = {
    brand: {
      modelClass: `${__dirname}/brand.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'addons.brandId',
        to: 'brands.id',
      },
    },
  };
}
