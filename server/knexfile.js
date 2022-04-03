/* eslint-disable @typescript-eslint/no-var-requires */
// Update with your config settings.
require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "postgresql",
  connection: {
    database: process.env["DB_NAME"],
    user: process.env["DB_USERNAME"],
    password: process.env["DB_PASSWORD"],
  },
  migrations: {
    directory: "db/migrations",
  },
  seeds: {
    directory: "db/seeds",
  },
};
