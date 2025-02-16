const uuid = require('uuid')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('lesson', (t) => {
	t.uuid('id_lesson').primary().notNullable();
    t.string('video_url').notNullable();
    t.uuid('id_course').notNullable()
    t.foreign('id_course')
      .references('id_course')
      .inTable('course').onDelete('CASCADE')
});
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('lesson')
};
