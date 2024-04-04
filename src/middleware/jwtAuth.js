import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

export default async (req, res, next) => {
    try {
        const token = req.cookies.user;
        if (!token) {
            res.clearCookie('token');
            res.redirect("/unauthorized");
            return;
        }

        const userData = jwt.verify(token, process.env.TOKEN_SALT);
        if (!userData) {
            res.clearCookie('token');
            res.redirect("/unauthorized");
            return;
        }

        const user = await User.query().findOne({ id: userData.id });
        if (!user) {
            res.clearCookie('token');
            res.redirect("/unauthorized");
            return;
        }

        req.user = user;

        return next();
    } catch (error) {
        res.clearCookie('token');
        res.redirect("/unauthorized");
    }
};