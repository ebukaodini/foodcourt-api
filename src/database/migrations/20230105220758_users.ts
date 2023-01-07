import { Knex } from 'knex';

const tableName = 'users';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.text('email').notNullable();
    t.text('password').notNullable;
    t.enum('role', ['user', 'admin']).notNullable();
    t.timestamps({ useCamelCase: true, defaultToNow: true });
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
