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
    const existingTodo = await Todo.query().where('title', req.body.title).first();
    if (existingTodo) {
        return req.flash = {
            message: 'Task already exists in this category',
            type: 'error'
        };
    }
    const newTodo = await Todo.query().insert({
        title: req.body.title,
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

// For the categories

export const createCategory = async (req, res) => {
    const newCategory = await Category.query().insert({
        name: req.body.name,
        link: req.body.name.toLowerCase()
    });
    console.log(newCategory);
    return res.redirect(req.headers.referer);
}

export const destroyCategory = async (req, res) => {
    const categoryLink = req.headers.referer.split('/').pop();
    const categoryUniqueId = await categoryId(req);
    const deletedTodos = await Todo.query().where('category_id', categoryUniqueId).delete();
    const deletedCategory = await Category.query().where('link', categoryLink).first().delete();
    if (!deletedCategory) {
        return res.send('Category not deleted');
    }
    return res.redirect('/');
}

export const handleCategoryPost = async (req, res) => {
    const action = req.body.action;
    if (action == 'createCategory') {
        createCategory(req, res);
    }
    if (action == 'deleteCategory') {
        destroyCategory(req, res);
    }
};

export const handlePost = async (req, res, next) => {
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
    } 
    if (action == 'edit') {
        edit(req, res);
    }
    if (action == 'delete') {
        destroy(req, res);
    }
    if (action == 'complete') {
        complete(req, res);
    }
    if (action == 'createCategory' || action == 'deleteCategory') {
        handleCategoryPost(req, res);
    }

    req.flash = {
        message: 'Todo created/edited successfully',
        type: 'success'
    };

    req.body = {};

    return next();
};