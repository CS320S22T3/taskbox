/* eslint-disable @typescript-eslint/no-var-requires */
import knex from "knex";

const config = require("../knexfile.js");

declare module "knex/types/tables" {
  interface User {
    id: number;
    email: string;
    password_digest: string;
  }

  interface Tables {
    users: User;
  }
}

export default knex(config);
