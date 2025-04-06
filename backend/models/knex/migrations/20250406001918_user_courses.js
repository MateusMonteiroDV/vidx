const uuid = require('uuid')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  	return knex.schema.createTable('user_courses', (t)=>{
  		t.uuid('id').primary().notNullable();
  		t.uuid('id_user').notNullable();
  		
  		t.foreign('id_user')
        .references('id_user')
        .inTable('user');
      
       	t.specificType('all_ids_courses', 'uuid ARRAY'); 


  	})
  }	

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
		return knex.schema.dropTableIfExists('user_courses')  
};
