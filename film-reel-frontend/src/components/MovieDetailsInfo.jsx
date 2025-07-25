import { Typography } from "@mui/material";

const MovieDetailsInfo = ({ movieDetails }) => {
  return (
    <>
      <Typography variant="h6" className="mt-4">
        Genre
      </Typography>
      <Typography>{movieDetails.genre}</Typography>
      <Typography variant="h6" className="mt-4">
        Overview
      </Typography>
      <Typography>{movieDetails.overview}</Typography>
      <Typography variant="h6" className="mt-4">
        Release Date
      </Typography>
      <Typography>{movieDetails.release_date}</Typography>
      <Typography variant="h6" className="mt-4">
        Popularity
      </Typography>
      <Typography>{`${movieDetails.popularity}%`}</Typography>
      <Typography variant="h6" className="mt-4">
        Budget
      </Typography>
      <Typography>{movieDetails.budget ?? "Unknown"}</Typography>
    </>
  );
};

export default MovieDetailsInfo;
