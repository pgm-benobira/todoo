/**
 * This is the todo controller that will handle the incoming requests
 */

import todosData from '../data/data.js';

export const home = (req, res) => {
    res.render("home", { todos: todosData });
}