import { Request } from "express";
import { IUser } from "./Auth";

export interface IRequestType extends Request {
    user?: IUser
}