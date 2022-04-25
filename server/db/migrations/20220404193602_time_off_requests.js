/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("time_off_requests", (t) => {
    t.increments("id").primary().unsigned();
    t.integer("type").notNullable();
    t.date("start_date").notNullable();
    t.date("end_date").notNullable();
    t.string("notes").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knew.schema.dropTable("time_off_requests");
};
