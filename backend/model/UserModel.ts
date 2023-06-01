import { Schema, model } from "mongoose"
import { IUser } from "../types/Auth";

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: 1
    },

    password: {
        type: String,
        required: true,
        select: false
    }
})

const UserModel = model<IUser>("UserModel", userSchema, "users")
export default UserModel;