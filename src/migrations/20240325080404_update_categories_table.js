const tableName = "categories";

export function up(knex) {
    return knex.schema.table(tableName, function (table) {
        // delete the isDeleted column
        table.dropColumn('isDeleted');
    });
}

export function down(knex) {
    return knex.schema.table(tableName, function (table) {
        table.boolean('isDeleted').defaultTo(false);
    });
}
