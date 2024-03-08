const tableName = "todos";

export function up(knex) {
    return knex.schema.table(tableName, function (table) {
        // relation with categories table
        table.integer("category_id").unsigned();
        table.foreign("category_id").references("categories.id");
        // remove the category column
        table.dropColumn("category");
    });
}

export function down(knex) {
    return knex.schema.table(tableName, function (table) {
        table.dropColumn("category_id");
    });
}
