import { body } from "express-validator";

export default [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Username must be less than 50 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Email must be less than 255 characters")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];
