import { Inject, Injectable } from '@nestjs/common';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { AddonModel } from '../../database/models/addon.model';
import { AddonCategoriesService } from '../addon-categories/addon-categories.service';
import { ModelClass } from 'objection';

@Injectable()
export class AddonsService {
  constructor(
    private addonCategoriesService: AddonCategoriesService,
    @Inject('AddonModel') private modelClass: ModelClass<AddonModel>,
  ) {}

  async create(brandId: number, createAddonDto: CreateAddonDto) {
    const categoryId = await this.addonCategoriesService.findOrCreate(
      brandId,
      createAddonDto.category,
    );

    const addon = await this.modelClass
      .query()
      .insert({
        brandId,
        categoryId: categoryId,
        name: createAddonDto.name,
        price: Number(createAddonDto.price),
        description: createAddonDto.description,
      })
      .returning('*')
      .first();

    return { addon };
  }

  async findAll(brandId: number) {
    return {
      addons: await this.modelClass.query().select('*').where({ brandId }),
    };
  }

  async findOne(brandId: number, id: number) {
    return {
      addon: await this.modelClass
        .query()
        .select('*')
        .where({ brandId, id })
        .first(),
    };
  }

  async update(brandId: number, id: number, updateAddonDto: UpdateAddonDto) {
    const categoryId = await this.addonCategoriesService.findOrCreate(
      brandId,
      updateAddonDto.category,
    );

    return {
      addon: await this.modelClass
        .query()
        .where({ brandId, id })
        .update({
          categoryId: Number(categoryId),
          name: updateAddonDto.name,
          price: updateAddonDto.price,
          description: updateAddonDto.description,
          updatedAt: new Date(),
        })
        .returning('*')
        .first(),
    };
  }

  async remove(brandId: number, id: number) {
    return {
      addon: await this.modelClass
        .query()
        .where({ brandId, id })
        .delete()
        .returning('*')
        .first(),
    };
  }
}
