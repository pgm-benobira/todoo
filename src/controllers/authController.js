
/**
 * This function will render the register page
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

/**
 * This function will render the login page
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
