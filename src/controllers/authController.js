/**
 * An auth controller that handles login, register, and logout
 */

import dotenv from "dotenv";
dotenv.config();
import { validationResult } from "express-validator";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Register page
**/
export const registerPage = (req, res) => {
    // Create input fields
    const inputs = [
        {
        name: "username",
        placeholder: "Username",
        type: "text",
        err: req.formErrorFields?.username ? req.formErrorFields.username : "",
        value: req.body?.username ? req.body.username : "",
        },
        {
        name: "email",
        placeholder: "Email address",
        type: "text",
        err: req.formErrorFields?.email ? req.formErrorFields.email : "",
        value: req.body?.email ? req.body.email : "",
        },
        {
        name: "password",
        placeholder: "Create a password",
        type: "text",
        err: req.formErrorFields?.password ? req.formErrorFields.password : "",
        value: req.body?.password ? req.body.password : "",
        },
    ];

    // Get flash message if available
    const flash = req.flash || "";

    res.render("register", {
        inputs,
        flash
    });
};

export const postRegister = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.formErrorFields = {};
        errors.array().forEach(error => {
            req.formErrorFields[error.path] = error.msg;
        });

        // Show errors in browser via the current page
        return next();
    }

    // Check if the user already exists
    const userExists = await User.query().findOne({ email: req.body.email });
    if (userExists) {
        req.flash = {
            type: "error",
            message: "An user with that email already exists",
        }
        return next();
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // Create a new user
    const user = await User.query().insert({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

    // Redirect to login page
    res.redirect("/login");
};

/**
 * Login page
**/
export const loginPage = (req, res) => {
    // Create input fields
    const inputs = [
        {
        name: "email",
        placeholder: "Email address",
        type: "text",
        err: req.formErrorFields?.email ? req.formErrorFields.email : "",
        value: req.body?.email ? req.body.email : "",
        },
        {
        name: "password",
        placeholder: "Password",
        type: "text",
        err: req.formErrorFields?.password ? req.formErrorFields.password : "",
        value: req.body?.password ? req.body.password : "",
        },
    ];

    // Get flash message if available
    const flash = req.flash || "";

    res.render("login", {
        inputs,
        flash
    });
};


export const postLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.formErrorFields = {};
        errors.array().forEach(error => {
            req.formErrorFields[error.path] = error.msg;
        });

        // Show errors in browser via the current page
        return next();
    }

    // Check if the user exists
    const user = await User.query().findOne({ email: req.body.email });
    if (!user) {
        req.flash = {
            type: "error",
            message: "User not found",
        }
        return next();
    }

    // Check if the password is correct
    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordMatch) {
        req.flash = {
            type: "error",
            message: "Password is incorrect",
        }
        return next();
    }

    // Token
    const token = jwt.sign({id: user.id, email: user.email }, process.env.TOKEN_SALT, {expiresIn: "1h",});

    res.cookie("user", token, {httpOnly: true});

    // Redirect to the todos page
    res.redirect("/todos");
};

/**
 * Logout
 */
export const logout = async (req, res) => {};