import {
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
  DB_HOST,
  DB_PORT,
} from "../constants";

export default {
  development: {
    dialect: "postgres",
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
  },
};
