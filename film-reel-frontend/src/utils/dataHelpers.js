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

export const getPopularMoviesList = async () => {
  try {
    const response = await axios.get("http://localhost:8000/movies");

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
    const res = await axios.get("http://localhost:8000/favorites");
    const favoriteIds = res.data;

    const detailedMovies = await Promise.all(
      favoriteIds.map(async (id) => {
        const response = await axios.get(`http://localhost:8000/movies/${id}`);
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
    await axios.post("http://localhost:8000/favorites", { movie_id });
    dispatch(addMovie({ movie_id }));
  } catch (err) {
    console.error("Failed to add favorite", err);
  }
};

export const handleRemoveFavorite = async (dispatch, movie_id) => {
  try {
    await axios.delete(`http://localhost:8000/favorites/${movie_id}`);
    dispatch(removeMovie({ movie_id }));
  } catch (err) {
    console.error("Failed to remove favorite", err);
  }
};

export const loadReviews = async (dispatch, movie_id) => {
  try {
    const res = await axios.get(`http://localhost:8000/reviews/${movie_id}`);
    dispatch(setReviewsForMovie({ movie_id, reviews: res.data }));
  } catch (err) {
    console.error("Failed to load reviews", err);
  }
};

export const submitReview = async (dispatch, reviewData) => {
  try {
    await axios.post("http://localhost:8000/reviews", reviewData);
    dispatch(addReview({ movie_id: reviewData.movie_id, review: reviewData }));
  } catch (err) {
    console.error("Failed to submit review", err);
  }
};

export const movieGenres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

export const getGenreNameFromId = (genreId) => {
  const genre = movieGenres.find((g) => g.id === genreId);
  return genre ? genre.name : "Unknown";
};
