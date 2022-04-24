/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("user_information", (t) => {
        t.increments("id").primary().unsigned();
        t.integer("user_id").unsigned().notNullable();
        t.string("first_name").notNullable();
        t.string("last_name").notNullable();
        t.string("position").notNullable();
        t.date("date_hired").notNullable();
        t.boolean("is_manager").notNullable();
    })

    .alterTable("users", (t) => {
        t.integer("user_id").unsigned().notNullable();
        t.foreign("user_id").references("user_information.user_id");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    knex.schema.dropTable("user_information");

    knex.schema.alterTable("users", (t) => {
        t.dropColumn("user_id");
    });
};
