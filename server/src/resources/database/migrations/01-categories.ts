import Knex from 'knex'

export function up(knex: Knex) {
  return knex.schema.createTable('categories', table => {
    table.increments('id').primary().notNullable()
    table.string('name').notNullable()
    table.string('color', 7).defaultTo('#333333')
  })
}

export const down = (knex: Knex) => knex.schema.dropTable('categories')
