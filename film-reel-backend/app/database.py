import sqlite3

DB_NAME = "film_reel.db"


def get_connection():
    return sqlite3.connect(DB_NAME)


def create_movies_table():
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS movies (
                id INTEGER PRIMARY KEY,
                title TEXT,
                poster_path TEXT,
                genre TEXT,
                overview TEXT,
                release_date TEXT,
                popularity REAL,
                budget INTEGER
            )
        """
        )
        conn.commit()


def create_favorites_table():
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS favorites (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                movie_id INTEGER
            )
        """
        )
        conn.commit()


def create_reviews_table():
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                movie_id INTEGER,
                user_id INTEGER,
                user_full_name TEXT,
                rating REAL,
                text TEXT
            )
        """
        )
        conn.commit()
