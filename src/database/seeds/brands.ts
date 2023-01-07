import { Knex } from 'knex';
import { BrandModel } from '../models/brand.model';

export async function seed(knex: Knex): Promise<any> {
  await BrandModel.query(knex).insert([
    {
      name: 'Chicken Republic',
    },
    {
      name: 'Mega Chicken',
    },
    {
      name: 'The Amala Place',
    },
    {
      name: 'The Place',
    },
  ]);
}
