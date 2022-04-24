const bcrypt = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("tasks").del();
  await knex("training_assignments").del();
  await knex("companies").del();
  await knex("time_off_requests").del();



  const companies = await knex("companies").insert(
    [{ name: "Development Company" }],
    '*'
  );

  const users = await knex("users").insert(
    [
      {
        company_id: companies[0].id,
        email: "ben@email.com",
        password_digest: bcrypt.hashSync("password"),
      },
      {
        company_id: companies[0].id,
        email: "daniel@email.com",
        password_digest: bcrypt.hashSync("password"),
      },
      {
        company_id: companies[0].id,
        email: "ava@email.com",
        password_digest: bcrypt.hashSync("password"),
      },
      {
        company_id: companies[0].id,
        email: "matt@email.com",
        password_digest: bcrypt.hashSync("password"),
      },
      {
        company_id: companies[0].id,
        email: "long@email.com",
        password_digest: bcrypt.hashSync("password"),
      },
      {
        company_id: companies[0].id,
        email: "rohit@email.com",
        password_digest: bcrypt.hashSync("password"),
      },
      {
        company_id: companies[0].id,
        email: "navid@email.com",
        password_digest: bcrypt.hashSync("password"),
      },
      {
        company_id: companies[0].id,
        email: "aastha@email.com",
        password_digest: bcrypt.hashSync("password"),
      },
      {
        company_id: companies[0].id,
        email: "jeet@email.com",
        password_digest: bcrypt.hashSync("password"),
      },
      {
        company_id: companies[0].id,
        email: "hongxiang@email.com",
        password_digest: bcrypt.hashSync("password"),
      },
    ],
    "*"
  );

  const ta = await knex("training_assignments").insert(
    [{ link: "assignment" }],
    "*"
  );

  const tasks = await knex("tasks").insert(
    [
      {
        assigner_id: users[0].id,
        assignee_id: users[1].id,
        due_date: "2022-05-08",
        created_date: "2022-05-05",
        info_type: "time_off_requests",
        info_id: 1,
      },
      {
        assigner_id: users[0].id,
        assignee_id: users[1].id,
        due_date: "2022-05-08",
        created_date: "2022-05-05",
        info_type: "training_assignments",
        info_id: ta[0].id,
      },
    ],
    "*"
  );
  const time_off_requests = await knex("time_off_requests").insert([
    {
      type: 2,
      start_date: "2022-06-08",
      end_date: "2022-06-29",
      notes: "spending summer break in europe",
    },
    {
      type: 0,
      start_date: "2022-05-12",
      end_date: "2022-05-26",
      notes:
        "received a positive covid test have been asked to quarantine for 2 weeks",
    },
    {
      type: 3,
      start_date: "2022-09-01",
      end_date: "2023-03-01",
      notes: "parental leave",
    },
    {
      type: 1,
      start_date: "2022-09-01",
      end_date: "2022-10-05",
      notes: "jury duty",
    },
  ],
    "*"
  );
};
