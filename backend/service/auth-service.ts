import UserModel from "../model/UserModel";
import { IUser } from "../types/Auth";


class AuthService {
    async register(userData: IUser) {
        return await UserModel.create<IUser>(userData)
    }
}

export default new AuthService();