/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("tasks", (table) => {
        table.increments("id").primary().unsigned();
        table.string("info_type");
        table.integer("info_id").references("id").inTable(info_type);
        table.integer("assigner_id").references("user_id").inTable("user_informations");
        table.integer("assignee_id").references("user_id").inTable("user_informations");
        table.date("due_date");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable("tasks");
};
