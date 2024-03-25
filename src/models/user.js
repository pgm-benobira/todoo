import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// define the User model
class User extends Model {
    static get tableName() {
        return "users";
    }
    
    static get idColumn() {
        return "id";
    }
    
    static get jsonSchema() {
        return {
        type: "object",
        required: ["email", "password", "username"],
        properties: {
            id: { type: "integer" },
            email: { type: "string", minLength: 1, maxLength: 255 },
            password: { type: "string", minLength: 1, maxLength: 255 },
            username: { type: "string", minLength: 1, maxLength: 255 },
        },
        };
    }
    
    }
    
    export default User;