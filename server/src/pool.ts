/* eslint-disable @typescript-eslint/no-var-requires */
import knex from "knex";
import {
  PerformanceReviewRequest,
  TimeOffRequest,
  TrainingAssignment,
  Task,
  User,
  UserInformation,
  Company,
} from "types";

const config = require("../knexfile.js");

declare module "knex/types/tables" {
  interface Tables {
    performance_review_requests: PerformanceReviewRequest;
    time_off_request: TimeOffRequest;
    training_assignments: TrainingAssignment;
    tasks: Task;
    users: User;
    user_informations: UserInformation;
    companies: Company;
  }
}

export default knex(config);
