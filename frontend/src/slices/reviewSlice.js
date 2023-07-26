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
        setComments: (state, action) => {
            const { reviewId, comments } = action.payload;
            const index = state.reviews.findIndex(review => review.id === reviewId);
            state.reviews[index].review_comments = comments;
        },
        setIsNewReview: (state, action) => {
            state.isNewReview = action.payload;
        },
        setIsReviewLoading: (state, action) => {
            state.isReviewLoading = action.payload;
        },
    },
});

export const { setReviews, setComments, setIsNewReview, setIsReviewLoading } = reviewSlice.actions;

export default reviewSlice.reducer;