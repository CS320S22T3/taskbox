/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_informations", (t) => {
    t.increments("id").primary().unsigned();
    t.integer("user_id").notNullable();
    t.foreign("user_id").references("id").inTable("users");
    t.string("first_name").notNullable();
    t.string("last_name").notNullable();
    t.string("position").notNullable();
    t.date("date_hired").notNullable();
    t.boolean("is_manager").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("user_informations");
};
