import Router from 'express';
const router = new Router();
import controller from './authController.js';
import { check } from "express-validator";
import authMiddleware from './authMiddleware.js';
import cookie from "cookie-parser";

router.use(cookie());

router.set('views', './templates');

router.get('/registration', (req, res) => {
    res.render('registration');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/repository', authMiddleware, controller.repository);
router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({ min: 4, max: 10 })
], controller.registration);
// router.post('/registration', (req, res) => {
//     console.log(req.body);
// });

router.post('/login', controller.login);

export default router;