import Todo from '../models/todo.js';
import Category from '../models/category.js';

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
    const newTodo = await Todo.query().insert({
        title: req.body.title,
        category_id: await categoryId(req),
    });
    console.log(newTodo);
    res.redirect(req.headers.referer);
};

export const edit = async (req, res) => {
    const todoId = req.body.id;
    const patchedTodo = await Todo.query().patchAndFetchById(todoId, {
        title: req.body.title
    });
    res.redirect(req.headers.referer);
};

export const destroy = async (req, res) => {
    const todoId = req.body.id;
    const deleted = await Todo.query().deleteById(todoId);
    if (!deleted) {
        return res.send('Todo not deleted');
    }
    res.redirect(req.headers.referer);
};

export const complete = async (req, res) => {
    const todoId = req.body.id;
    const todo = await Todo.query().findById(todoId);
    const isDone = todo.isDone;
    const completed = await Todo.query().patchAndFetchById(todoId, {
        isDone: !isDone
    });
    res.redirect(req.headers.referer);
};

// For the categories

export const createCategory = async (req, res) => {
    const newCategory = await Category.query().insert({
        name: req.body.name,
        link: req.body.name.toLowerCase()
    });
    console.log(newCategory);
    res.redirect(req.headers.referer);
}

export const destroyCategory = async (req, res) => {
    const categoryLink = req.headers.referer.split('/').pop();
    const categoryUniqueId = await categoryId(req);
    const deletedTodos = await Todo.query().where('category_id', categoryUniqueId).delete();
    const deletedCategory = await Category.query().where('link', categoryLink).first().delete();
    if (!deletedCategory) {
        return res.send('Category not deleted');
    }
    res.redirect('/');
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

export const handlePost = async (req, res) => {
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
};