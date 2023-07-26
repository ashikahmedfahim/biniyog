import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reviews: [],
    count: 0,
    isReviewLoading: false,
    isNewReview: false,
};


const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        setReviews: (state, action) => {
            state.count = action.payload.count;
            state.reviews = action.payload.rows;
        },
        setIsNewReview: (state, action) => {
            state.isNewReview = action.payload;
        },
        setIsReviewLoading: (state, action) => {
            state.isReviewLoading = action.payload;
        },
    },
});

export const { setReviews, setIsNewReview, setIsReviewLoading } = reviewSlice.actions;

export default reviewSlice.reducer;