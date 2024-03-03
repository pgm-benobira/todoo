import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

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
    required: ["title", "category", "isDone"],
    properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        category: { type: "string", minLength: 1, maxLength: 255 },
        isDone: { type: "boolean" },
        isDeleted: { type: "boolean"}
    },
    };
}
}

export default Todo;
