import { BaseModel } from './base.model';

export class BrandModel extends BaseModel {
  static tableName = 'brands';

  name: string;
  createdAt: Date;
  updatedAt: Date;
}
