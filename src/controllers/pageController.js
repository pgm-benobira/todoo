/**
 * This is the todo controller that will handle the incoming requests
 */

import Todo from '../models/todo.js';
import Category from '../models/category.js';

export const home = async (req, res) => {
    // Replacing: const todos = await Todo.query().where('category', 'default');
    const todos = await Todo.query()
        .select('todos.*', 'categories.*')
        .join('categories', 'todos.category_id', '=', 'categories.id')
        .where('categories.link', '/');
    const categories = await Category.query();
    res.render("home", {
        todos,
        categories
    });
}

export const categoryPage = async (req, res) => {
    const { slug } = req.params;
    const todos = await Todo.query()
        .select('todos.*', 'categories.*')
        .join('categories', 'todos.category_id', '=', 'categories.id')
        .where('categories.link', slug);
    const categories = await Category.query();
    res.render("home", {
        todos,
        categories
    });
}

export const handlePost = async (req, res) => {
    res.send(req.body);
}