const tableName = "categories";

export function up(knex) {
    return knex.schema.table(tableName, function (table) {
        // delete the isActive column
        table.dropColumn('isActive');
    });
}

export function down(knex) {
    return knex.schema.table(tableName, function (table) {
        table.boolean('isActive').defaultTo(false);
    });
}
