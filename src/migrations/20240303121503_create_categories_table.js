const tableName = "categories";

export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id").primary();
        // name, link, isDeleted, isActive
        table.string("name").notNullable();
        table.string("link").notNullable();
        table.boolean("isDeleted").defaultTo(false);
        table.boolean("isActive").defaultTo(false);
    });
}

export function down(knex) {
    return knex.schema.dropTable(tableName);
}
