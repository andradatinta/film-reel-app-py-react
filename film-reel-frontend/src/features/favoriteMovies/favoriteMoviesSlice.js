import { createSlice } from "@reduxjs/toolkit";

export const favoriteMoviesSlice = createSlice({
  name: "favoriteMovies",
  initialState: [],
  reducers: {
    addMovie: (state, action) => {
      state.push(action.payload);
    },
    removeMovie: (state, action) => {
      return state.filter((movie) => movie.movieId !== action.payload.movieId);
    },
  },
});

export const selectFavoriteMovies = (state) => state.favoriteMovies;
export const isMovieFavorited = (state, id) => {
  return state.favoriteMovies.some((movie) => movie.movieId === id);
};

export const { addMovie, removeMovie } = favoriteMoviesSlice.actions;

export default favoriteMoviesSlice.reducer;
