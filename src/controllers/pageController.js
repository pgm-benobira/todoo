/**
 * This is the todo controller that will handle the incoming requests
 */

import Todo from '../models/todo.js';
import Category from '../models/category.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
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
    const value = req.body?.title ? req.body.title : '';

    const todos = await Todo.query();
    const categories = await Category.query();

    // Get flash message if available
    const flash = req.flash || "";

    const token = req.cookies.user;
    if (token) {
        const userData = jwt.verify(token, process.env.TOKEN_SALT);
        if (userData) {
            const user = await User.query().findOne({ id: userData.id });
            res.render("todos", {
                todos,
                categories,
                err,
                value,
                flash,
                user
            });
            return;
        }
    }

    res.render("todos", {
        todos,
        categories,
        err,
        value,
        flash
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

    res.render("categoryTodos", {
        todos,
        categories,
        err,
        value,
        flash
    });
}