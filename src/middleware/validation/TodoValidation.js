import { body } from "express-validator";

export default [
    body('title')
        .notEmpty()
        .withMessage('A task is required')
        .bail()
        .isLength({ min: 3})
        .withMessage('Task must be at least 3 characters long')
        .isLength({ max: 30})
        .withMessage('Task must be at most 30 characters long'),
];