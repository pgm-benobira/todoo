/**
 * Categories API Controller
 */
import Category from "../../models/category.js";

/**
 * Get a single category
 */
export const getCategory = async (req, res, next) => {
    const id = req.params.id;
    const category = await Category.query().findById(id);
    if (!category) {
        res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
};

/**
 * Get all categories
 */
export const getCategories = async (req, res, next) => {
    const categories = await Category.query();
    res.json(categories);
};