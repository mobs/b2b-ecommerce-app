import { createSlice, nanoid } from "@reduxjs/toolkit";
import { changePassword, editAvatar, editPersonalInfo, persistLogin, signIn, signOut, signUp } from "./apiSlice";

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    error: "",
    message: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.fulfilled, (state, action) => {
                state.user = action.payload.data.user
                state.accessToken = action.payload.data.accessToken
                state.refreshToken = action.payload.data.refreshToken
                state.error = ""
            })
            .addCase(signUp.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(signIn.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.user = action.payload.data.user
                state.accessToken = action.payload.data.accessToken
                state.refreshToken = action.payload.data.refreshToken
                state.error = ""
            })
            .addCase(signOut.fulfilled, (state, action) => {
                state.message = action.payload.message
                state.accessToken = ""
                state.refreshToken = ""
                state.user = null
            })
            .addCase(signOut.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.message = action.payload.message;
            })
            .addCase(editPersonalInfo.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(editPersonalInfo.fulfilled, (state, action) => {
                state.user = action.payload.data.user;
            })
            .addCase(editAvatar.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(editAvatar.fulfilled, (state, action) => {
                state.user = action.payload.data.user
            })
            .addCase(persistLogin.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(persistLogin.fulfilled, (state, action) => {
                state.user = action.payload.data.user
                state.accessToken = action.payload.data.accessToken
                state.refreshToken = action.payload.data.refreshToken
                state.error = ""
            })
    }
})

export const { createUser, getUser } = userSlice.actions;
export default userSlice.reducer;