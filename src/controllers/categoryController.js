import Todo from '../models/todo.js';
import Category from '../models/category.js';

// For the categories

const categoryId = async (req) => {
    const categoryLink = req.headers.referer.split('/').pop();
    const category = await Category.query()
        .where('link', `/${categoryLink}`)
        .first();
        return category.id;
};

export const createCategory = async (req, res) => {
    const newCategory = await Category.query().insert({
        name: req.body.name,
        link: `/${req.body.name.toLowerCase()}`
    });
    console.log(newCategory);
    return res.redirect(req.headers.referer);
}

export const destroyCategory = async (req, res) => {
    const categoryLink = req.headers.referer.split('/').pop();
    const categoryUniqueId = await categoryId(req);
    const deletedTodos = await Todo.query().where('category_id', categoryUniqueId).delete();
    const deletedCategory = await Category.query().where('link', `/${categoryLink}`).first().delete();
    if (!deletedCategory) {
        return res.send('Category not deleted');
    }
    return res.redirect('/todos');
}

export const handleCategoryPost = async (req, res, next) => {
    const action = req.body.action;
    if (action == 'createCategory') {
        createCategory(req, res);
        return;
    }
    if (action == 'deleteCategory') {
        destroyCategory(req, res);
        return;
    }

    return next();
};