import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import todoReducer from "../features/todo/todoSlice"
import categoryReducer from "../features/category/categorySlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        todo: todoReducer,
        category: categoryReducer,
    }
})

export default store