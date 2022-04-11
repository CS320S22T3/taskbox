/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {

  return knex.schema
<<<<<<< HEAD
  .createTable("companies", (t) => {
    t.increments("id").primary().unsigned();
    t.string("name").notNullable()
  })

  .alterTable("users", (t) => {
    t.integer("company_id").unsigned();
    t.foreign("company_id").references("companies.id")
  })
=======
    .createTable("companies", (t) => {
      t.increments("id").primary().unsigned();
      t.string("name").notNullable()
    })

    .alterTable("users", (t) => {
      t.integer("company_id").unsigned().notNullable();
      t.foreign("company_id").references("companies.id")
    })
>>>>>>> 357b2e8ad807e6716ff4300222a416a6d7742b96


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
