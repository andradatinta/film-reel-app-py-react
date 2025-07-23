import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFavoriteMovies } from "../features/favoriteMovies/favoriteMoviesSlice";
import { loadFavorites } from "../utils/dataHelpers";

import MovieCard from "../components/MovieCard";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector(selectFavoriteMovies);
  console.log(favoriteMovies);

  useEffect(() => {
    loadFavorites(dispatch);
  }, [dispatch]);

  return (
    <div className=" grid lg:grid-cols-3 grid-rows-2 gap-x-5 gap-y-5 sm:grid-cols-2 py-4 px-2">
      {favoriteMovies.map((movie) => {
        return (
          <MovieCard
            key={movie.movie_id}
            id={movie.movie_id}
            title={movie.movie_title}
            genre={movie.movie_genre}
            poster={`https://image.tmdb.org/t/p/w200/${movie.movie_poster}`}
          />
        );
      })}
    </div>
  );
};

export default FavoritesPage;
