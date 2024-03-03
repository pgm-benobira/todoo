const tableName = "todos";

export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        // title, category, isDone, isDeleted
        table.string("title").notNullable();
        table.string("category").notNullable();
        table.boolean("isDone").defaultTo(false);
        table.boolean("isDeleted").defaultTo(false);
    });
}

export function down(knex) {
    return knex.schema.dropTable(tableName);
}
