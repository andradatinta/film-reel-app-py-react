import { getPopularMoviesList } from "../utils/dataHelpers";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import MovieCard from "../components/MovieCard";
import ReplayIcon from "@mui/icons-material/Replay";
const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const fetchPopularMovies = async () => {
    const data = await getPopularMoviesList();
    setMovies(data);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <Button
        variant="outlined"
        size="medium"
        sx={{ marginTop: "16px" }}
        startIcon={<ReplayIcon />}
        onClick={() => {
          fetchPopularMovies();
        }}
      >
        Regenerate
      </Button>
      <div className="grid lg:grid-cols-3 grid-rows-2 gap-x-5 gap-y-5 sm:grid-cols-2 py-4 px-2">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            genre={movie.genre}
            poster={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
