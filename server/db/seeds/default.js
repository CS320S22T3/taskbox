const bcrypt = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("tasks").del();

  await knex("users").insert([
    { email: "ben@email.com", password_digest: bcrypt.hashSync("password") },
    { email: "daniel@email.com", password_digest: bcrypt.hashSync("password") },
    { email: "ava@email.com", password_digest: bcrypt.hashSync("password") },
    { email: "matt@email.com", password_digest: bcrypt.hashSync("password") },
    { email: "long@email.com", password_digest: bcrypt.hashSync("password") },
    { email: "rohit@email.com", password_digest: bcrypt.hashSync("password") },
    { email: "navid@email.com", password_digest: bcrypt.hashSync("password") },
    { email: "aastha@email.com", password_digest: bcrypt.hashSync("password") },
    { email: "jeet@email.com", password_digest: bcrypt.hashSync("password") },
    { email: "hongxiang@email.com", password_digest: bcrypt.hashSync("password") },
  ]);

  //Date format as YYYY-MM-DD
  const tasks = await knex("tasks").insert([
    { assigner_id: 1, assignee_id: 2, due_date: "2022-05-08", info_type: "time_off_requests", info_id: 1 }
  ]);

};
