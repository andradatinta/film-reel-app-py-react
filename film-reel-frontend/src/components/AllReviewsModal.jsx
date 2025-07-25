import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectAllReviewsForMovie } from "../features/reviews/reviewsSlice";
import { loadReviews } from "../utils/dataHelpers";

const AllReviewsDialog = ({
  isModalOpen,
  handleAllReviewsModalOnClose,
  movieTitle,
  movieId,
}) => {
  const dispatch = useDispatch();
  const movieReviews = useSelector((state) =>
    selectAllReviewsForMovie(state, movieId)
  );

  useEffect(() => {
    if (isModalOpen && movieId !== undefined) {
      loadReviews(dispatch, movieId);
    }
  }, [dispatch, movieId, isModalOpen]);

  return (
    <>
      <Dialog
        open={isModalOpen}
        maxWidth="sm"
        fullWidth
        onClose={handleAllReviewsModalOnClose}
      >
        <DialogTitle>{`All Reviews for ${movieTitle}`}</DialogTitle>

        <DialogContent>
          <div className="flex flex-col gap-4">
            {movieReviews.map((review) => (
              <div className="flex flex-col gap-2">
                <Typography>From: {review.user_full_name}</Typography>
                <Typography>Rating: {review.rating} </Typography>
                <Typography>Review: {review.text ?? "-"} </Typography>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="submit"
            size="medium"
            sx={{ marginTop: "1rem" }}
            onClick={handleAllReviewsModalOnClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllReviewsDialog;
