import Todo from '../models/todo.js';
import Category from '../models/category.js';
import { validationResult } from 'express-validator';

// For the todos

const categoryId = async (req) => {
    const categoryLink = req.headers.referer.split('/').pop();
    if (categoryLink == '') {
        const category = await Category.query()
        .where('link', '/')
        .first();
        return category.id;
    }
    const category = await Category.query()
        .where('link', categoryLink)
        .first();
        return category.id;
};

export const create = async (req, res) => {
    const inputTitle = req.body.title;
    // Check if the todo already exists with the matching category
    const existingTodo = await Todo.query().where('title', inputTitle).where('category_id', await categoryId(req)).first();
    if (existingTodo) {
        req.flash = {
            message: 'Task already exists in this category',
            type: 'error'
        };
        return res.redirect(req.headers.referer);
    }
    const newTodo = await Todo.query().insert({
        title: inputTitle,
        category_id: await categoryId(req),
    });
    console.log(newTodo);
    return res.redirect(req.headers.referer);
};

export const edit = async (req, res) => {
    const todoId = req.body.id;
    const patchedTodo = await Todo.query().patchAndFetchById(todoId, {
        title: req.body.title
    });
    return res.redirect(req.headers.referer);
};

export const destroy = async (req, res) => {
    const todoId = req.body.id;
    const deleted = await Todo.query().deleteById(todoId);
    if (!deleted) {
        return res.send('Todo not deleted');
    }
    return res.redirect(req.headers.referer);
};

export const complete = async (req, res) => {
    const todoId = req.body.id;
    const todo = await Todo.query().findById(todoId);
    const isDone = todo.isDone;
    const completed = await Todo.query().patchAndFetchById(todoId, {
        isDone: !isDone
    });
    return res.redirect(req.headers.referer);
};

export const handleTodoPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.formErrorFields = {};
        errors.array().forEach(error => {
            req.formErrorFields[error.path] = error.msg;
        });

        // show errors in browser via the current page
        return next();
    }

    const action = req.body.action;
    if (action == 'create') {
        create(req, res);
        return;
    } 
    if (action == 'edit') {
        edit(req, res);
        return;
    }
    if (action == 'delete') {
        destroy(req, res);
        return;
    }
    if (action == 'complete') {
        complete(req, res);
        return;
    }

    req.body = {};

    return next();
};