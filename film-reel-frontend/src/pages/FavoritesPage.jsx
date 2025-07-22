import React from "react";
import { useSelector } from "react-redux";
import { selectFavoriteMovies } from "../features/favoriteMovies/favoriteMoviesSlice";
import MovieCard from "../components/MovieCard";

const FavoritesPage = () => {
  const favoriteMovies = useSelector(selectFavoriteMovies);

  return (
    <div className=" grid lg:grid-cols-3 grid-rows-2 gap-x-5 gap-y-5 sm:grid-cols-2 py-4 px-2">
      {favoriteMovies.map((movie) => {
        return (
          <MovieCard
            key={movie.movieId}
            id={movie.movieId}
            title={movie.movieTitle}
            genre={"Comedy"}
            poster={`https://image.tmdb.org/t/p/w200/${movie.moviePoster}`}
          />
        );
      })}
    </div>
  );
};

export default FavoritesPage;
