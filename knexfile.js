// Update with your config settings.

module.exports = {

    development: {
      client: 'mysql',
      connection: {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'taproom_local',
        charset: 'utf8'
      }
    },

  staging: {
    client: 'mysql',
    connection: {
      database: 'taproom_local',
      user:     'root',
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
    client: 'mysql',
    connection: {
      database: 'taproom_local',
      user:     'root',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
