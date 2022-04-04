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
};
