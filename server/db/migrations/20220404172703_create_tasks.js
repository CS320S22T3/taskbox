/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("tasks", (table) => {
        table.increments("id").primary().unsigned();
        table.integer("assigner_id");
        table.integer("assignee_id");
        table.date("due_date");
        table.integer("info_type");
        table.integer("info_id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable("tasks");
};
