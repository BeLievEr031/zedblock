import createError from 'http-errors';
import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../helper/jwt"
import UserModel from "../model/UserModel";
import { IRequestType } from '../types/Middleware';
import mongoose from 'mongoose';

export const auth = async (req: IRequestType, res: Response, next: NextFunction) => {



    const { token } = req.headers;
    // console.log(token);
    if (!token || token.length === 0) {
        return next(createError(422, "Invalid token"))
    }

    let { id } = verifyJWT(token as string);
    const isUser = await UserModel.findById(new mongoose.Types.ObjectId(id))
    // console.log(isUser);

    if (!isUser) {
        return next(createError(409, "Invalid token"))
    }

    req.user = isUser;
    next();
}