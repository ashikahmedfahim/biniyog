import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    user: null,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        saveAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        saveUser: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state, action) => {
            state.accessToken = null;
            state.user = null;
        },
    },
});

export const {
    saveAccessToken,
    saveUser,
    logoutUser
} = authSlice.actions;

export default authSlice.reducer;