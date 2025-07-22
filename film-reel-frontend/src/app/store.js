import { configureStore } from "@reduxjs/toolkit";
import favoriteMoviesSliceReducer from "../features/favoriteMovies/favoriteMoviesSlice";
import reviewsSliceReducer from "../features/reviews/reviewsSlice";

export const store = configureStore({
  reducer: {
    favoriteMovies: favoriteMoviesSliceReducer,
    reviews: reviewsSliceReducer,
  },
});
