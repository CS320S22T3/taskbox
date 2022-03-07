/* Use username = < process.env.CI_DB_USERNAME > & password = < process.env.CI_DB_PASSWORD > */
const fs = require('fs');

module.exports = {
  development: {
    username: 'database_dev',
    password: 'database_dev',
    database: 'taskbox',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    }
  }
};