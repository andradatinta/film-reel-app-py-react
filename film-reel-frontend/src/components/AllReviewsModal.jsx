import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectAllReviewsForMovie } from "../features/reviews/reviewsSlice";

const AllReviewsDialog = ({
  isModalOpen,
  handleAllReviewsModalOnClose,
  movieTitle,
}) => {
  const movieReviews = useSelector((state) =>
    selectAllReviewsForMovie(state, movieTitle)
  );
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
                <Typography>From: {review.name}</Typography>
                <Typography>Rating: {review.rating} </Typography>
                <Typography>Review: {review.review ?? "-"} </Typography>
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
