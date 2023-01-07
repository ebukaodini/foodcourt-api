import { Inject, Injectable } from '@nestjs/common';
import { CreateAddonCategoryDto } from './dto/create-addon-category.dto';
import { ModelClass } from 'objection';
import { AddonCategoryModel } from '../../database/models/addon-category.model';

@Injectable()
export class AddonCategoriesService {
  constructor(
    @Inject('AddonCategoryModel')
    private modelClass: ModelClass<AddonCategoryModel>,
  ) {}

  async create(
    brandId: number,
    createAddonCategoryDto: CreateAddonCategoryDto,
  ) {
    return {
      category: await this.modelClass
        .query()
        .insert({ brandId, name: createAddonCategoryDto.name })
        .returning('*'),
    };
  }

  async findOrCreate(brandId: number, category?: string) {
    if (category.length === 0) return null;

    const categoryId = await this.modelClass
      .query()
      .select('id')
      .where({ brandId, name: category })
      .first();

    return categoryId === undefined
      ? (
          await this.modelClass
            .query()
            .insert({ brandId, name: category })
            .returning('id')
            .first()
        ).id
      : categoryId.id;
  }
}
