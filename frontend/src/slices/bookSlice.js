import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: [],
    isBookLoading: false,
};


const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload;
        },
        setIsBookLoading: (state, action) => {
            state.isBookLoading = action.payload;
        },
    },
});

export const { setBooks, setIsBookLoading } = bookSlice.actions;

export default bookSlice.reducer;