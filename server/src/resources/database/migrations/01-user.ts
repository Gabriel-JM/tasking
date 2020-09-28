import Knex from 'knex'

export function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary().notNullable()
    table.string('name', 120).notNullable()
    table.string('password').notNullable()
  })
}

export const drop = (knex: Knex) => knex.schema.dropTable('users')
