/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 

 exports.up = function(knex){

  return knex.schema.createTable('enrollment', (t) => {
     t.uuid('id_enrollment').primary().notNullable();
    t.uuid('id_user').notNullable();
    t.uuid('id_course').notNullable();

    t.foreign('id_user')
      .references('id_user')
      .inTable('user')
      

    t.foreign('id_course')
      .references('id_course')
      .inTable('course')
      
  })
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('enrollment')
};
