import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// import related models
import Category from "./category.js";

// define the Todo model
class Todo extends Model {
static get tableName() {
    return "todos";
}

static get idColumn() {
    return "id";
}

static get jsonSchema() {
    return {
    type: "object",
    required: ["title", "category_id"],
    properties: {
        id: { type: "integer" },
        category_id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        isDone: { type: "boolean" },
        isDeleted: { type: "boolean"}
    },
    };
}

static get relationMappings() {
    return {
        category: {
            relation: Model.BelongsToOneRelation,
            modelClass: Category,
            join: {
                from: "todos.category_id",
                to: "categories.id",
            },
        },
    }
}
}

export default Todo;
