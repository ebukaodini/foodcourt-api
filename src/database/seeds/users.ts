import { Knex } from 'knex';
import { UserModel } from '../models/user.model';

export async function seed(knex: Knex): Promise<any> {
  await UserModel.query(knex).insert([
    {
      email: 'john.doe@example.com',
      password: '12345',
      role: 'admin',
    },
    {
      email: 'jane.doe@example.com',
      password: '67890',
      role: 'user',
    },
  ]);
}
