import { IRequestType } from './../types/Middleware.d';
import createError from 'http-errors';
import { Request, Response, NextFunction } from "express";
import Joi from "joi"
import bcrypt from "bcrypt"
import AuthService from "../service/auth-service";
import { IUser } from "../types/Auth";
import UserModel from "../model/UserModel";
import { signJWT } from '../helper/jwt';

class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const validationSchema = Joi.object<IUser>({
                username: Joi.string().trim().required().disallow(""),
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().disallow(""),
                password: Joi.string().min(6).required().disallow("")
            })

            const { error, value } = validationSchema.validate(req.body);
            if (error) {
                return next(error)
            }

            // checking email exists or not
            const isUser = await UserModel.findOne({ email: value.email })
            if (isUser) {
                return next(createError(409, 'Email Already exists'))
            }

            // Generating Salt and Hashing password
            const salt = await bcrypt.genSalt(10);
            value.password = await bcrypt.hash(value.password, salt);
            const result: IUser = await AuthService.register(value)

            return res.status(200).json({
                success: true,
                data: result
            })

        } catch (error) {
            return next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {

            const validationSchema = Joi.object<IUser>({
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().disallow(""),
                password: Joi.string().min(6).required().disallow("")
            })

            const { error, value } = validationSchema.validate(req.body);
            if (error) {
                return next(error)
            }

            // checking email exists or not
            const isUser = await UserModel.findOne({ email: value.email }).select("+password")
            if (!isUser) {
                return next(createError(409, "Invalid Credentials"))
            }

            const isPassword = await bcrypt.compare(value.password, isUser.password)
            if (!isPassword) {
                return next(createError(409, "Invalid Credentials"))
            }

            const token = signJWT(isUser._id + "", res);
            return res.status(200).json({
                success: true,
                token,
                user: isUser,
            })
            // const result = await AuthService.login(isUser, value.password);

        } catch (error) {
            return next(error)
        }
    }

    async whoAmI(req: IRequestType, res: Response, next: NextFunction) {
        try {
            const id = req.user?._id;
            const user = await UserModel.findById(id)
            return res.status(200).json({
                success: true,
                data: user
            })
        } catch (error) {
            return next(error)

        }
    }
}

export default new AuthController();