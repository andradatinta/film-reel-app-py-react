import { Button, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovie,
  isMovieFavorited,
  removeMovie,
} from "../features/favoriteMovies/favoriteMoviesSlice";

const MovieCard = ({ id, title, genre, poster }) => {
  const dispatch = useDispatch();
  const isFavorited = useSelector((state) => isMovieFavorited(state, id));
  const onFavoriteHandler = (movie) => {
    if (isFavorited) {
      dispatch(removeMovie(movie));
    } else {
      dispatch(addMovie(movie));
    }
  };
  return (
    <div className="bg-[#495057] sm:w-[360px] w-full sm:h-60 h-full rounded-md flex sm:flex-row flex-col overflow-hidden shadow-light">
      <div className="sm:w-1/2 w-full sm:h-full h-2/3">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover aspect-[2/3] rounded-l-md"
        />
      </div>
      <div className="p-2 flex flex-col gap-2 sm:w-1/2 w-full justify-between">
        <div>
          <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
          <Typography sx={{ fontSize: "14px" }}>{genre}</Typography>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Link to={`/movies/${id}`}>
            <Button
              variant="contained"
              startIcon={<MoreHorizIcon />}
              size="medium"
            >
              More Details
            </Button>
          </Link>
          <Button
            variant="contained"
            startIcon={<FavoriteIcon htmlColor="#ff6b6b" />}
            size="medium"
            onClick={() =>
              onFavoriteHandler({
                movieId: id,
                movieTitle: title,
                moviePoster: poster,
              })
            }
          >
            {isFavorited ? "Unfavorite" : "Favorite"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
