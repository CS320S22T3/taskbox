const bcrypt = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("companies").del();

  await knex("companies").insert([
    {name: "Development Company"}
  ])
  await knex("users").insert([
    { company_id: 1, email: "ben@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: 1, email: "daniel@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: 1, email: "ava@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: 1, email: "matt@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: 1, email: "long@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: 1, email: "rohit@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: 1, email: "navid@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: 1, email: "aastha@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: 1, email: "jeet@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: 1, email: "hongxiang@email.com", password_digest: bcrypt.hashSync("password") },
  ]);
};
