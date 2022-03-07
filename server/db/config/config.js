/* Use username = < process.env.CI_DB_USERNAME > & password = < process.env.CI_DB_PASSWORD > */
const fs = require('fs');
const { env } = require('process');

module.exports = {
  development: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    }
  }
};