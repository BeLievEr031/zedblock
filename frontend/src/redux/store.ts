import { configureStore } from "@reduxjs/toolkit";
import bulkSlice from "./slice/bulkSlice";
import authSlice from "./slice/authSlice";



const store = configureStore({
    reducer: {
        authSlice: authSlice,
        bulkAction: bulkSlice
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch