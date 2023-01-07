import { Knex } from 'knex';

const tableName = 'addons';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.integer('brandId').references('id').inTable('brands');
    t.text('name').notNullable();
    t.text('description').nullable();
    t.double('price').notNullable();
    t.integer('categoryId')
      .nullable()
      .references('id')
      .inTable('addon-categories');
    t.timestamps({ useCamelCase: true, defaultToNow: true });
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
