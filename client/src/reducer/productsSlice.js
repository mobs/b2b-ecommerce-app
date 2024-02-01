import { createSlice, nanoid } from "@reduxjs/toolkit";
import { fetchProducts } from "./apiSlice";

const initialState = {
    loading: "",
    products: [{}],
    error: ""
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProducts(state, action) {
            state.products = action.payload;
        },

        addProducts(state, action) {

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error
            })
    }
})

export const { getProducts, addProducts} = productSlice.actions

export default productSlice.reducer;