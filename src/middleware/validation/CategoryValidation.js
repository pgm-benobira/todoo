import { body } from "express-validator";

export default [
    body('name')
        .notEmpty()
        .withMessage('A category name is required')
        .bail()
        .isLength({ min: 3})
        .withMessage('Category name must be at least 3 characters long')
        .isLength({ max: 30})
        .withMessage('Category name must be at most 30 characters long'),
];