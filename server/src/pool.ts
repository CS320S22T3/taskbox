/* eslint-disable @typescript-eslint/no-var-requires */
import knex from "knex";

const config = require("../knexfile.js");

declare module "knex/types/tables" {
  interface User {
    id: number;
    company_id: number,
    email: string;
    password_digest: string;
  }

  interface Company {
    id: number;
    name: string;
  }

  interface Tables {
    users: User;
    companies: Company
  }
}

export default knex(config);
