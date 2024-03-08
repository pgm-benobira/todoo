import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// import related models
import Todo from "./todo.js";

// define the Category model
class Category extends Model {
static get tableName() {
    return "categories";
}

static get idColumn() {
    return "id";
}

static get jsonSchema() {
    return {
    type: "object",
    required: ["name", "link"],
    properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        link: { type: "string", minLength: 1, maxLength: 255},
        isDeleted: { type: "boolean" },
        isActive: { type: "boolean"}
    },
    };
}

static get relationMappings() {
    return {
        todos: {
            relation: Model.HasManyRelation,
            modelClass: Todo,
            join: {
                from: "categories.id",
                to: "todos.category_id",
            },
        },
    }
}
}

export default Category;
