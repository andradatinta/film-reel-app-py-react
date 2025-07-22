import { createSlice } from "@reduxjs/toolkit";

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState: [],
  reducers: {
    addReview: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const selectAllReviews = (state) => {
  return state.reviews;
};
export const selectAllReviewsForMovie = (state, title) => {
  return state.reviews.filter((review) => review.movieTitle === title);
};

export const { addReview } = reviewsSlice.actions;

export default reviewsSlice.reducer;
