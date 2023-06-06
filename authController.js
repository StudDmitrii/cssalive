import Users from './models/Users.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { secret } from "./token.js";

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, 'SECRET_KEY_RANDOM', { expiresIn: "24h" });
}

class authController {
    async registration(req, res) {
        console.log(req.body);
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибки при регистрации" }, errors);
            }
            const { username, password } = req.body;
            const condidate = await Users.findOne({
                where: {
                    user_name: username
                }
            });
            if (condidate) {
                return res.status(400).json({ message: "Пользователь с таким именем уже существует" })
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            await Users.create({
                user_name: username,
                user_password: hashPassword
            });
            return res.redirect('auth/login');
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await Users.findOne({
                where: {
                    user_name: username
                }
            });
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` });
            }
            const validPassword = bcrypt.compareSync(password, user.user_password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Введён неверный пароль' });
            }
            const token = generateAccessToken(user.user_id);
            res.cookie('token', token);
            return res.redirect('/');
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'login error' });
        }
    }
    async repository(req, res) {
        res.send("Личный кабинет"); //TODO
    }
}

export default new authController();