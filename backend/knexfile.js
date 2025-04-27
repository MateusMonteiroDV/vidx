require('dotenv').config()


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        database:process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password:process.env.DB_PASSWORD
    },

    production:{
      client: 'pg',
      connection: {
        host: process.env.DB_HOST_PRODUCTION,
        database:process.env.DB_DATABASE_PRODUCTION,
        user: process.env.DB_USER_PRODUCTION,
        password:process.env.DB_PASSWORD_PRODUCTION

      }

    },

    migration:{
      directory: './models/knex/migrations',
      schemaName: 'public',
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migration: {
      tableName: 'knex_migrations'
    }
  }

};
