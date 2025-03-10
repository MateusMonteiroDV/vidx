/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('lesson', (t) => {
    t.string('s3_key').nullable();
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.hasColumn('lesson', 's3_key').then((exists) => {
    if (exists) {
      return knex.schema.alterTable('lesson', (t) => {
        t.dropColumn('s3_key');
      });
    }
  });
};

