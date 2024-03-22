/**
 * This is the todo controller that will handle the incoming requests
 */

import Todo from '../models/todo.js';
import Category from '../models/category.js';

export const home = async (req, res) => {
    const err = req.formErrorFields?.title ? req.formErrorFields.title : '';
    const value = req.body?.title ? req.body.value : '';

    // Replacing: const todos = await Todo.query().where('category', 'default');
    const todos = await Todo.query()
        .join('categories', 'todos.category_id', '=', 'categories.id')
        .where('categories.link', '/');
    const categories = await Category.query();

    // Get flash message if available
    const flash = req.flash || "";

    res.render("home", {
        todos,
        categories,
        err,
        value,
        flash
    });
}

export const categoryPage = async (req, res) => {
    const err = req.formErrorFields?.title ? req.formErrorFields.title : '';
    const value = req.body?.title ? req.body.value : '';

    const { slug } = req.params;
    const todos = await Todo.query()
        .join('categories', 'todos.category_id', '=', 'categories.id')
        .where('categories.link', slug);
    const categories = await Category.query();

    // Get flash message if available
    const flash = req.flash || "";

    res.render("home", {
        todos,
        categories,
        err,
        value,
        flash
    });
}