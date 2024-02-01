import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../reducer/productsSlice";
import usersSlice from "../reducer/usersSlice";

export const store = configureStore({
    reducer: {
        product: productsSlice,
        user: usersSlice
    }
})