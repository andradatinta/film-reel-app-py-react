import { createSlice } from "@reduxjs/toolkit";

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {},
  reducers: {
    addReview: (state, action) => {
      const { movie_id, review } = action.payload;
      if (!state[movie_id]) {
        state[movie_id] = [];
      }
      state[movie_id].push(review);
    },
    setReviewsForMovie: (state, action) => {
      const { movie_id, reviews } = action.payload;
      state[movie_id] = reviews;
    },
  },
});

export const selectAllReviewsForMovie = (state, movie_id) => {
  return state.reviews[movie_id] || [];
};

export const { addReview, setReviewsForMovie } = reviewsSlice.actions;

export default reviewsSlice.reducer;
