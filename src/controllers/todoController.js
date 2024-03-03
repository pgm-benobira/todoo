/**
 * This is the todo controller that will handle the incoming requests
 */

import todosData from '../data/todos.js';
import categoriesData from '../data/categories.js';

export const home = (req, res) => {
    res.render("home", { todos: todosData, categories: categoriesData });
}