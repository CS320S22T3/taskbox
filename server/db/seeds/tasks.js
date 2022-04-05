const bcrypt = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("tasks").del();

    //Date format as YYYY-MM-DD
    await knex("tasks").insert([
        { assigner_id: 1, assignee_id: 2, due_date: "2022-05-08", info_type: "time_off_requests", info_id: 1 }
    ]);
}