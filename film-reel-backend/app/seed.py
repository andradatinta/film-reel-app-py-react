import httpx
from app.database import get_connection
from app.constants import movie_genres
from dotenv import load_dotenv
import os

load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")


def map_genre(genre_ids):
    return movie_genres.get(genre_ids[0], "Unknown") if genre_ids else "Unknown"


async def fetch_tmdb_movies(page=1):
    url = (
        f"https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}&page={page}"
    )
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            return response.json().get("results", [])
    return []


async def fetch_movie_details(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            return response.json()
    return None


async def seed_movies(pages_to_fetch=5):
    with get_connection() as conn:
        cursor = conn.cursor()
        for page in range(1, pages_to_fetch + 1):
            movies = await fetch_tmdb_movies(page)
            for m in movies:
                genre = map_genre(m.get("genre_ids", []))
                details = await fetch_movie_details(m["id"])
                if not details:
                    continue

                try:
                    cursor.execute(
                        """
                        INSERT INTO movies (id, title, poster_path, genre, overview, release_date, popularity, budget)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                        ON CONFLICT(id) DO UPDATE SET
                            title = excluded.title,
                            poster_path = excluded.poster_path,
                            genre = excluded.genre,
                            overview = excluded.overview,
                            release_date = excluded.release_date,
                            popularity = excluded.popularity,
                            budget = excluded.budget
                        """,
                        (
                            m["id"],
                            m["title"],
                            m["poster_path"],
                            genre,
                            m.get("overview", ""),
                            m.get("release_date", ""),
                            m.get("popularity", 0),
                            details.get("budget", 0),
                        ),
                    )
                except Exception as e:
                    print(f"Error inserting movie {m['title']}: {e}")
        conn.commit()
