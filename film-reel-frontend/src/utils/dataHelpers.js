import axios from "axios";

const tmbdKey = process.env.REACT_APP_TMDB_KEY;

export const getPopularMoviesList = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: tmbdKey,
          page: Math.floor(Math.random() * 50) + 1,
        },
      }
    );
    if (response.status === 200) {
      const movies = response.data.results;
      if (movies.length > 12) {
        return movies.slice(0, 12);
      }
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: tmbdKey,
        },
      }
    );

    if (response.status === 200) {
      if (response.data) {
        return response.data;
      }
    }
  } catch (error) {
    console.log(error);
    return {};
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
