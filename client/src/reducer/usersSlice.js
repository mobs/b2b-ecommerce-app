import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    loading: "",
    users: []
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        createUser(state, action) {

        },
        getUser(state, action) {

        }
    }
})

export const { createUser, getUser } = userSlice.actions;
export default userSlice.reducer;