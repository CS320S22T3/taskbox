/* eslint-disable @typescript-eslint/no-var-requires */
import knex from "knex";

const config = require("../knexfile.js");

declare module "knex/types/tables" {
  interface User {
    id: number;
    company_id: number;
    email: string;
    password_digest: string;
  }

  interface Company {
    id: number;
    name: string;
  }

  interface Task {
    id: number;
    info_type: string;
    info_id: number;
    assigner_id: number;
    assignee_id: number;
    due_date: Date;
    created_date: Date;
  }

  interface Tables {
    users: User;
    companies: Company;
    tasks: Task;
  }
}

export default knex(config);
