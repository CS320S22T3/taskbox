/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {

  knex.schema.createTable("companies", (t) => {
    t.increments("id").primary().unsigned();
    t.string("name").notNullable()
  })

  knex.schema.alterTable("users", (t) => {
    t.integer("company_id").unsigned();
    t.foreign("company_id").references("companies.id")
  })

  knex.schema.createTable("user_informations", (t) => {
    t.increments("id").primary().unsigned();
    t.integer("user_id").unsigned();
    t.string("first_name").notNullable();
    t.string("last_name").notNullable();
    t.string("position").notNullable();
    t.date("date_hired");
    t.boolean("is_manager")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("companies");

  knex.schema.alterTable("users", (t) => {
    t.dropColumn("company_id");
  })

  knex.schema.dropTable("user_information");

};
