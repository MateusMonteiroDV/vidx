const uuid = require('uuid')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
 return knex.schema.createTable('course',(t)=>{
  	t.uuid('id_course').primary().notNullable()
  	t.string('title').notNullable();
  	t.string('description').notNullable();
    t.string('image_url').nullable();
  	t.uuid('id_user').notNullable();
    t.foreign('id_user').references('id_user').inTable('user');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('course')
};
