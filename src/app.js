// Import statements
import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { create } from "express-handlebars";
import { home } from "./controllers/todoController.js";

// Create an Express application.
const app = express();

// Create `ExpressHandlebars` instance with a default layout.
const hbs = create({
    extname: "hbs",
});

// Register `hbs` as our view engine using its extension name.
app.engine("hbs", hbs.engine);

// Set the view engine to use Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(path.resolve("src"), "views"))

// Register `hbs` as our view engine using its extension name.
app.use(express.static('public'));

// Define the route for the home page
app.get('/', home);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});