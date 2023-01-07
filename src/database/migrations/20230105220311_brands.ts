import { Knex } from 'knex';

const tableName = 'brands';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.text('name').notNullable();
    t.timestamps({ useCamelCase: true, defaultToNow: true });
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
