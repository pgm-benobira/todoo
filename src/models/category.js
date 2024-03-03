import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

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
}

export default Category;
