import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
};


const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        removeNotification: (state, action) => {
            state.notifications.shift();
        },
    },
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;