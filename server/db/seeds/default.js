const bcrypt = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("companies").del();

  const companies = await knex("companies").insert([
    {name: "Development Company"}
  ])
  await knex("users").insert([
    { company_id: companies[0].id, email: "ben@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: companies[0].id, email: "daniel@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: companies[0].id, email: "ava@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: companies[0].id, email: "matt@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: companies[0].id, email: "long@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: companies[0].id, email: "rohit@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: companies[0].id, email: "navid@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: companies[0].id, email: "aastha@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: companies[0].id, email: "jeet@email.com", password_digest: bcrypt.hashSync("password") },
    { company_id: companies[0].id, email: "hongxiang@email.com", password_digest: bcrypt.hashSync("password") },
  ]);
};
