import { Router } from "express";
import { login, register, logout } from '../controller/user.controller.js'
import { body } from "express-validator";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router()

router.route('/register').post(
    [
        body('username').isLength({ min: 3}).withMessage('User name is atleast 3 character'),
        body('email').isEmail().withMessage('Email is invalid'),
        body('password').isLength({ min: 6 }).withMessage('Password too short'),
    ],
    register
)

router.route('/login').post(
    [
        body('email').isEmail().withMessage('Email is invalid'),
        body('password').isLength({ min: 6 }).withMessage('Password too short'),
    ],
    login
)

router.route('/logout').post(verifyJWT, logout)

export default router