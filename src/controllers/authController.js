/**
 * An auth controller that handles login, register, and logout
 */

import { validationResult } from "express-validator";

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

        // show errors in browser via the current page
        return next();
    }

    res.send("Registering successful");
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

        // show errors in browser via the current page
        return next();
    }

    res.send("Login successful");
};