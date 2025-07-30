import axios from "axios";
import {
  setFavorites,
  addMovie,
  removeMovie,
} from "../features/favoriteMovies/favoriteMoviesSlice";
import {
  setReviewsForMovie,
  addReview,
} from "../features/reviews/reviewsSlice";
import { auth } from "../auth/firebaseConfig";

export const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) return {};

  const token = await user.getIdToken();
  console.log("Token: ", token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getPopularMoviesList = async (isRegenerate = false) => {
  try {
    const url = isRegenerate
      ? "http://localhost:8000/movies?force_refresh=true"
      : "http://localhost:8000/movies";

    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/movies/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    return {};
  }
};

export const loadFavorites = async (dispatch) => {
  try {
    const config = await getAuthHeaders();
    const res = await axios.get("http://localhost:8000/favorites", config);
    const favoriteIds = res.data;

    const detailedMovies = await Promise.all(
      favoriteIds.map(async (id) => {
        const response = await axios.get(
          `http://localhost:8000/movies/${id}`,
          config
        );
        const movie = response.data;
        return {
          movie_id: movie.id,
          movie_title: movie.title,
          movie_poster: movie.poster_path,
          movie_genre: movie.genre,
        };
      })
    );

    dispatch(setFavorites(detailedMovies));
  } catch (err) {
    console.error("Failed to load favorites", err);
  }
};

export const handleAddFavorite = async (dispatch, movie_id) => {
  try {
    const config = await getAuthHeaders();
    await axios.post("http://localhost:8000/favorites", { movie_id }, config);
    dispatch(addMovie({ movie_id }));
  } catch (err) {
    console.error("Failed to add favorite", err);
  }
};

export const handleRemoveFavorite = async (dispatch, movie_id) => {
  try {
    const config = await getAuthHeaders();
    await axios.delete(`http://localhost:8000/favorites/${movie_id}`, config);
    dispatch(removeMovie({ movie_id }));
  } catch (err) {
    console.error("Failed to remove favorite", err);
  }
};

export const loadReviews = async (dispatch, movie_id) => {
  try {
    const config = await getAuthHeaders();
    const res = await axios.get(
      `http://localhost:8000/reviews/${movie_id}`,
      config
    );
    dispatch(setReviewsForMovie({ movie_id, reviews: res.data }));
  } catch (err) {
    console.error("Failed to load reviews", err);
  }
};

export const submitReview = async (dispatch, reviewData) => {
  try {
    const config = await getAuthHeaders();
    await axios.post("http://localhost:8000/reviews", reviewData, config);
    dispatch(addReview({ movie_id: reviewData.movie_id, review: reviewData }));
  } catch (err) {
    console.error("Failed to submit review", err);
  }
};
