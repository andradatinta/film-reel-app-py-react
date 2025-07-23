import { createSlice } from "@reduxjs/toolkit";

export const favoriteMoviesSlice = createSlice({
  name: "favoriteMovies",
  initialState: [],
  reducers: {
    setFavorites: (state, action) => {
      return action.payload;
    },
    addMovie: (state, action) => {
      state.push(action.payload);
    },
    removeMovie: (state, action) => {
      return state.filter(
        (movie) => movie.movie_id !== action.payload.movie_id
      );
    },
  },
});

export const selectFavoriteMovies = (state) => state.favoriteMovies;

export const isMovieFavorited = (state, id) => {
  return state.favoriteMovies.some((movie) => movie.movie_id === Number(id));
};

export const { setFavorites, addMovie, removeMovie } =
  favoriteMoviesSlice.actions;

export default favoriteMoviesSlice.reducer;
