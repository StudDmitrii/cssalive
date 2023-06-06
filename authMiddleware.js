import jwt from 'jsonwebtoken';
import { secret } from './token.js';
import cookie from "cookie-parser";
import Router from 'express';
const router = new Router();
router.use(cookie());

export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.cookies.token
        if (!token) {
            return res.redirect('/auth/login');
        }
        const decodeData = jwt.verify(token, 'SECRET_KEY_RANDOM');
        req.user = decodeData;
        next();
    }
    catch (e) {
        console.log(e);
        return res.redirect('/auth/login');
    }
}