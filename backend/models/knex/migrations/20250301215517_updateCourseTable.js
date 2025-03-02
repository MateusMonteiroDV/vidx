/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('public.course', (t) => {
    t.string('image').nullable(); // Add the `image` column
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Check if the column exists before dropping it
  const columnExists = await knex.schema.hasColumn('course', 'image');
  if (columnExists) {
    return knex.schema.alterTable('course', (t) => {
      t.dropColumn('image'); // Drop the `image` column
    });
  }
};