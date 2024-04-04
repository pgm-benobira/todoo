/**
 * This is the todo controller that will handle the incoming requests
 */

import Todo from '../models/todo.js';
import Category from '../models/category.js';
import dotenv from 'dotenv';
dotenv.config();

/**
 * This function will render the home page
**/
export const homePage = (req, res) => {
    res.render("home");
};

/**
 *  This function will render the page with all the todos
**/
export const todosPage = async (req, res) => {
    const err = req.formErrorFields?.title ? req.formErrorFields.title : '';
    const errCategory = req.formErrorFields?.name ? req.formErrorFields.name : '';
    const value = req.body?.title ? req.body.title : '';
    const valueCategory = req.body?.name ? req.body.name : '';

    const todos = await Todo.query();
    const categories = await Category.query();

    // Get flash message if available
    const flash = req.flash || "";

    // Get the username of the user
    const user = req.user;
    const username = user.username;

    res.render("todos", {
        todos,
        categories,
        err,
        errCategory,
        value,
        valueCategory,
        flash,
        username
    });
}

/**
 *  This function will render the page with all the todos in a category
**/
export const categoryTodosPage = async (req, res) => {
    const err = req.formErrorFields?.title ? req.formErrorFields.title : '';
    const value = req.body?.title ? req.body.title : '';

    const { slug } = req.params;
    const todos = await Todo.query()
        .join('categories', 'todos.category_id', '=', 'categories.id')
        .where('categories.link', `/${slug}`);
    const categories = await Category.query();

    // Get flash message if available
    const flash = req.flash || "";

    // Get the username of the user
    const user = req.user;
    const username = user.username;

    res.render("categoryTodos", {
        todos,
        categories,
        err,
        value,
        flash,
        username
    });
}

/**
 * This function will render the unauthorized page
**/
export const unauthorizedPage = (req, res) => {
    res.render("unauthorized");
}