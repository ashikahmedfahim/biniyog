import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    followedUsers: [],
    followAbleUsers: [],
    isFollowerLoading: false,
    isUpdateNeeded: false,
};


const followerSlice = createSlice({
    name: "follower",
    initialState,
    reducers: {
        setFollowedUsers: (state, action) => {
            state.followedUsers = action.payload;
        },
        setFollowAbleUsers: (state, action) => {
            state.followAbleUsers = action.payload;
        },
        setIsFollowerLoading: (state, action) => {
            state.isFollowerLoading = action.payload;
        },
        setIsUpdateNeeded: (state, action) => {
            state.isUpdateNeeded = action.payload;
        },
    },
});

export const { 
    setFollowedUsers,
    setFollowAbleUsers,
    setIsFollowerLoading,
    setIsUpdateNeeded,
 } = followerSlice.actions;

export default followerSlice.reducer;