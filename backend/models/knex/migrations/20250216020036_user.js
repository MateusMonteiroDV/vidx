const uuid = require('uuid')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('user', (t) => {
    t.uuid('id_user').primary().notNullable() 
    t.string('name').notNullable();
    t.string('email').notNullable();
    t.string('password').notNullable();
    t.boolean('isAdmin').notNullable().defaultTo(false)
  	
  	});


};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
 return knex.schema.dropTableIfExists('user')
};
