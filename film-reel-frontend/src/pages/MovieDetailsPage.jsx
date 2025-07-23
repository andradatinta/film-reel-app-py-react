import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getMovieDetails } from "../utils/dataHelpers";
import { Typography, CircularProgress, Button } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddReviewDialog from "../components/AddReviewDialog";
import AllReviewsDialog from "../components/AllReviewsModal";
import MovieDetailsInfo from "../components/MovieDetailsInfo";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [isAllReviewsModalOpen, setIsAllReviewsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchMovieDetails = async () => {
    setLoading(true);
    const movieDetails = await getMovieDetails(id);
    setMovieDetails(movieDetails);
    console.log("movieDetails", movieDetails);
    setLoading(false);
  };

  const handleAddReviewModalOnOpen = () => {
    setIsAddReviewModalOpen(true);
  };

  const handleAllReviewsModalOnOpen = () => {
    setIsAllReviewsModalOpen(true);
  };

  const handleAddReviewModalOnClose = () => {
    setIsAddReviewModalOpen(false);
  };

  const handleAllReviewsModalOnClose = () => {
    setIsAllReviewsModalOpen(false);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (Object.keys(movieDetails).length === 0) {
    return (
      <div className="flex justify-center items-center">
        <Typography variant="h5">Movie details not found.</Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center p-4 w-3/4 gap-8">
      <Typography variant="h2">{movieDetails.title}</Typography>
      <div className="flex justify-around items-center">
        <div className="w-1/4 h-1/4 ">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="rounded-md shadow-light w-full h-full object-cover aspect-[2/3]"
          />
        </div>
        <div className="flex flex-col items-start w-2/3 whitespace-normal break-words gap-2 max-h-full">
          <MovieDetailsInfo movieDetails={movieDetails} />
          <div className="flex gap-4">
            <Button
              variant="contained"
              sx={{ marginTop: "1rem" }}
              startIcon={<CreateIcon />}
              onClick={handleAddReviewModalOnOpen}
            >
              Add Review
            </Button>
            <Button
              variant="contained"
              sx={{ marginTop: "1rem" }}
              startIcon={<FormatListBulletedIcon />}
              onClick={handleAllReviewsModalOnOpen}
            >
              See Reviews
            </Button>
          </div>
          <AddReviewDialog
            isModalOpen={isAddReviewModalOpen}
            handleAddReviewModalOnClose={handleAddReviewModalOnClose}
            movieTitle={movieDetails.title}
            movieId={movieDetails.id}
          />
          <AllReviewsDialog
            isModalOpen={isAllReviewsModalOpen}
            handleAllReviewsModalOnClose={handleAllReviewsModalOnClose}
            movieTitle={movieDetails.title}
            movieId={movieDetails.id}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
