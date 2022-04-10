const bcrypt = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knew("user_information").del();
  await knex("tasks").del();
  await knex("training_assignments").del();
  await knex("companies").del();

  const companies = await knex("companies").insert(
    [{ name: "Development Company" }],
    "*"
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

  await knex("user_information").insert([
    { user_id: users[0].id, first_name: "Matthew", last_name: 'Jordan', position: 'employee', date_hired: '3/27/2019', is_manager: true }, 
    { user_id: users[1].id, first_name: "Joe", last_name: 'Edwards', position: 'employee', date_hired: '3/27/2019', is_manager: false }
  ]);
};
