import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    loading: "",
    products: [{}]
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

    }
})

export const { getProducts, addProducts} = productSlice.actions

export default productSlice.reducer;