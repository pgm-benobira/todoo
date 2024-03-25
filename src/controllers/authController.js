/**
 * An auth controller that handles login, register, and logout
 */

import { validationResult } from "express-validator";
import User from "../models/user.js";

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

    // Create a new user
    const user = User.query().insert({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    // Set flash message
    req.flash = {
        type: "success",
        message: "User created successfully",
    };

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

    res.send("No mistakes in the form continue to login user");
};

/**
 * Logout
 */
export const logout = async (req, res) => {};