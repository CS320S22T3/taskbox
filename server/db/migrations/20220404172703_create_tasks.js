/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("tasks", (table) => {
        table.increments("id").primary().unsigned();
        table.string("info_type").notNullable;
        table.integer("info_id").notNullable();
        table.integer("assigner_id").notNullable()
            .references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
        table.integer("assignee_id").notNullable()
            .references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
        table.date("due_date").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable("tasks");
};
