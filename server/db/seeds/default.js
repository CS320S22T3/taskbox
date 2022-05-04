const bcrypt = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_informations").del();
  await knex("users").del();
  await knex("tasks").del();
  await knex("training_assignments").del();
  await knex("companies").del();
  await knex("time_off_requests").del();

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
  const time_off_requests = await knex("time_off_requests").insert(
    [
      {
        type: 2,
        start_date: "2022-06-08",
        end_date: "2022-06-29",
        notes: "spending summer break in europe",
      },
    ],
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
        info_id: time_off_requests[0].id,
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

  const userinfo = await knex("user_informations").insert(
    [
      {
        user_id: users[0].id,
        first_name: "Ben",
        last_name: "Melz",
        position: "employee",
        date_hired: "3-27-2019",
        is_manager: true,
      },
      {
        user_id: users[1].id,
        first_name: "Daniel",
        last_name: "Melanson",
        position: "employee",
        date_hired: "3-27-2019",
        is_manager: false,
      },
      {
        user_id: users[2].id,
        first_name: "Ava",
        last_name: "Smith",
        position: "employee",
        date_hired: "3-27-2019",
        is_manager: true,
      },
      {
        user_id: users[3].id,
        first_name: "Matthew",
        last_name: "Crowe",
        position: "employee",
        date_hired: "3-27-2019",
        is_manager: false,
      },
      {
        user_id: users[4].id,
        first_name: "Long",
        last_name: "Dang",
        position: "employee",
        date_hired: "3-27-2019",
        is_manager: true,
      },
      {
        user_id: users[5].id,
        first_name: "Rohit",
        last_name: "R",
        position: "employee",
        date_hired: "3-27-2019",
        is_manager: false,
      },
      {
        user_id: users[6].id,
        first_name: "Navid",
        last_name: "Bavar",
        position: "employee",
        date_hired: "3-27-2019",
        is_manager: true,
      },
      {
        user_id: users[7].id,
        first_name: "Aastha",
        last_name: "Patill",
        position: "employee",
        date_hired: "3-27-2019",
        is_manager: false,
      },
      {
        user_id: users[8].id,
        first_name: "Jeet",
        last_name: "Mitra",
        position: "employee",
        date_hired: "3-27-2019",
        is_manager: true,
      },
      {
        user_id: users[9].id,
        first_name: "Hongxiang",
        last_name: "Wang",
        position: "employee",
        date_hired: "3-27-2019",
        is_manager: false,
      },
    ],
    "*"
  );
};
