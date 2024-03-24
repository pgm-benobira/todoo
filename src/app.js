/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
 */
import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import { create } from "express-handlebars";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";

// Middleware
import TodoValidation from "./middleware/validation/TodoValidation.js";
import AuthRegisterValidation from "./middleware/validation/AuthRegisterValidation.js";
import AuthLoginValidation from "./middleware/validation/AuthLoginValidation.js";

// Controllers
import * as pageController from "./controllers/pageController.js";
import * as authController from "./controllers/authController.js";
import { handleTodoPost } from "./controllers/todoController.js";
import { handleCategoryPost } from "./controllers/categoryController.js";
import * as apiTodosController from "./controllers/api/todosController.js";
import * as apiCategoriesController from "./controllers/api/categoriesController.js";

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
app.get('/', pageController.homePage);

// Define the route for the register page
app.get('/register', authController.registerPage);
// Define the route for the register form submission
app.post('/register', AuthRegisterValidation, authController.postRegister, authController.registerPage);
// Define the route for the login page
app.get('/login', authController.loginPage);
// Define the route for the login form submission
app.post('/login', AuthLoginValidation, authController.postLogin, authController.loginPage);

// Define the route for the todos page
app.get('/todos', pageController.todosPage);
// Define the route for a category page
app.get('/todos/:slug', pageController.categoryTodosPage);
// Define the route for the todo and category form submission
app.post('/', handleCategoryPost, TodoValidation, handleTodoPost, pageController.todosPage);

// Define the routes for the todos API
app.get('/api/todos/:id', apiTodosController.getTodo);
app.get('/api/todos', apiTodosController.getTodos);
app.post('/api/todos', apiTodosController.createTodo);
app.put('/api/todos', apiTodosController.updateTodo);
app.delete('/api/todos/:id', apiTodosController.deleteTodo);

// Define the routes for the categories API
app.get('/api/categories/:id', apiCategoriesController.getCategory);
app.get('/api/categories', apiCategoriesController.getCategories);

/**
 * ------------------------------
 *        START SERVER
 * ------------------------------
 */
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on http://localhost:${process.env.PORT}`);
});