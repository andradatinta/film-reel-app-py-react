import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Rating,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { submitReview } from "../utils/dataHelpers";
import { useAuth } from "../auth/AuthContext";

const AddReviewDialog = ({
  isModalOpen,
  handleAddReviewModalOnClose,
  movieTitle,
  movieId,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();

  const onSubmit = (data) => {
    const reviewData = {
      movie_id: movieId,
      user_full_name: data.name,
      rating: data.rating,
      text: data.review,
    };
    submitReview(dispatch, reviewData);
    setHasSubmitted(true);
  };
  return (
    <>
      <Dialog
        open={isModalOpen}
        maxWidth="sm"
        fullWidth
        onClose={handleAddReviewModalOnClose}
      >
        <DialogTitle>{`Add Review for ${movieTitle}`}</DialogTitle>
        {!isLoggedIn ? (
          <Typography className="p-6 text-center text-lg">
            Please log in to leave a review.
          </Typography>
        ) : !hasSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <div className="flex flex-col gap-4">
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Name is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      margin="dense"
                      label="Full Name"
                      type="text"
                      fullWidth
                      variant="outlined"
                      color="#212529"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
                <Typography component="legend" sx={{ fontWeight: "400" }}>
                  Rating
                </Typography>
                <Controller
                  name="rating"
                  control={control}
                  defaultValue={0}
                  rules={{ required: "Rating is required" }}
                  render={({ field }) => (
                    <Rating {...field} precision={0.5} size="large" />
                  )}
                />
                <Controller
                  name="review"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="dense"
                      label="Review"
                      multiline
                      maxRows={4}
                      fullWidth
                      variant="outlined"
                      color="#212529"
                    />
                  )}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                variant="submit"
                size="medium"
                sx={{ marginTop: "1rem" }}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        ) : (
          <div className="flex justify-center items-center mb-6 mt-6">
            <Typography>Thank you for submitting a review!</Typography>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default AddReviewDialog;
