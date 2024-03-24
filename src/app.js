// Import statements
import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import { create } from "express-handlebars";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";

import TodoValidation from "./middleware/validation/TodoValidation.js";

import { homePage, registerPage, loginPage, todosPage, categoryTodosPage } from "./controllers/pageController.js";
import { handleTodoPost } from "./controllers/todoController.js";
import { handleCategoryPost } from "./controllers/categoryController.js";
import { getTodo, getTodos, createTodo, updateTodo, deleteTodo } from "./controllers/api/todosController.js";
import { getCategory, getCategories } from "./controllers/api/categoriesController.js";

/**
 * ------------------------------
 *       CONFIGURATION
 * ------------------------------
 */

// Create an Express application.
const app = express();

// Create `ExpressHandlebars` instance with a default layout.
const hbs = create({
    helpers: HandlebarsHelpers,
    extname: "hbs",
});

// Register `hbs` as our view engine using its extension name.
app.engine("hbs", hbs.engine);

// Set the view engine to use Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(path.resolve("src"), "views"))

// Register `hbs` as our view engine using its extension name.
app.use(express.static('public'));

// Import the `body-parser` library
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * ------------------------------
 *            ROUTING
 * ------------------------------
 */

// Define the route for the home page
app.get('/', homePage);
// Define the route for the register page
app.get('/register', registerPage);
// Define the route for the login page
app.get('/login', loginPage);
// Define the route for the todos page
app.get('/todos', todosPage);
// Define the route for a category page
app.get('/todos/:slug', categoryTodosPage);
// Define the route for the todo and category form submission
app.post('/', handleCategoryPost, TodoValidation, handleTodoPost, todosPage);

// Define the routes for the todos API
app.get('/api/todos/:id', getTodo);
app.get('/api/todos', getTodos);
app.post('/api/todos', createTodo);
app.put('/api/todos', updateTodo);
app.delete('/api/todos/:id', deleteTodo);

// Define the routes for the categories API
app.get('/api/categories/:id', getCategory);
app.get('/api/categories', getCategories);

/**
 * ------------------------------
 *        START SERVER
 * ------------------------------
 */
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on http://localhost:${process.env.PORT}`);
});