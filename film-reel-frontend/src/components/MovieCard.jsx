import { Button, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isMovieFavorited } from "../features/favoriteMovies/favoriteMoviesSlice";
import { handleAddFavorite, handleRemoveFavorite } from "../utils/dataHelpers";
import { useAuth } from "../auth/AuthContext";

const MovieCard = ({ id, title, genre, poster }) => {
  const dispatch = useDispatch();
  const isFavorited = useSelector((state) => isMovieFavorited(state, id));
  const { isLoggedIn } = useAuth();

  const onFavoriteHandler = (movie) => {
    if (!isLoggedIn) {
      alert("Please log in to add or remove favorites.");
      return;
    }

    if (isFavorited) {
      handleRemoveFavorite(dispatch, movie.movie_id);
    } else {
      handleAddFavorite(dispatch, movie.movie_id);
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
                movie_id: id,
                movie_title: title,
                movie_poster: poster,
                movie_genre: genre,
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
