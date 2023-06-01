import { Response } from "express";
import jwt from "jsonwebtoken"
interface IPayload {
    id: string;
}
export const signJWT = (_id: string, res: Response): string => {
    const payload = {
        id: _id
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET!)
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year,
        sameSite: "none",
        secure: false
    })

    return token;
}

export const verifyJWT = (token: string): IPayload => {
    // const secret = process.env.JWT_SECRET as string;
    const result = jwt.verify(token, process.env.JWT_SECRET!) as IPayload;
    // console.log(result);

    return result;
}





