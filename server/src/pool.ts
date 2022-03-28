/* eslint-disable @typescript-eslint/no-var-requires */
import knex from "knex";

const config = require("../knexfile.js");

export default knex(config);
