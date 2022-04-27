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

  interface UserInformation {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    position: string;
    date_hired: Date;
    is_manager: boolean;
  }
}

export default knex(config);
