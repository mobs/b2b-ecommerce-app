import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../reducer/productsSlice";

export const store = configureStore({
    reducer: {
        product: productsSlice
    }
})