import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface IUser {
    email: string,
    username: string
}

interface AuthState {
    isAuthenticated: boolean | null,
    user: IUser,
}

const initialState = {
    isAuthenticated: false,
    user: {
        email: "",
        username: ""
    }
} as AuthState

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<IUser | null>) {
            let user = action.payload as any;
            state.isAuthenticated = user ? true : null;
            state.user = user;
        }
    },
})

export const { setAuth } = authSlice.actions
export default authSlice.reducer