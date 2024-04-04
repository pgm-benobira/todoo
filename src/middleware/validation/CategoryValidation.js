import { body } from "express-validator";

export default [
    body('name')
        .notEmpty()
        .withMessage('A category name is required')
        .bail()
        // Spaces are not allowed
        .custom(value => !/\s/.test(value))
        .withMessage('Category name cannot contain spaces')
        .bail()
        .isLength({ min: 3})
        .withMessage('Category name must be at least 3 characters long')
        .isLength({ max: 20})
        .withMessage('Category name must be at most 20 characters long'),
];