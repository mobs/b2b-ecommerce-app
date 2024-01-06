import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    loading: "",
    banners: []
}

const bannerSlice = createSlice({
    name: 'banners',
    initialState,
    reducers: {
        getBanners(state, action) {

        },
        addBanners(state, action) {

        }
    }
})

export const { getBanners, addBanners } = bannerSlice.actions;
export default bannerSlice.reducer;