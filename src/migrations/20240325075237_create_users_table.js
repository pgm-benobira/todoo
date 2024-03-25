const tableName = "users";

export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id");
        table.string("email", 255).notNullable();
        table.string("password", 255).notNullable();
        table.string("username", 255).notNullable();
    });
}

export function down(knex) {
    return knex.schema.dropTable(tableName);
}
