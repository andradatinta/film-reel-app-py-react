from fastapi import APIRouter, HTTPException, Request, Query
from fastapi_cache import FastAPICache
from fastapi_cache.decorator import cache
from app.database import get_connection
from pydantic import BaseModel

import random

router = APIRouter()


class Movie(BaseModel):
    id: int
    title: str
    poster_path: str
    genre: str
    overview: str
    release_date: str
    popularity: float
    budget: int


@router.get("/movies", response_model=list[Movie])
@cache(expire=60)
async def get_movies(request: Request, force_refresh: bool = Query(False)):

    if force_refresh:
        await FastAPICache.clear(namespace=None)

    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies")
        rows = cursor.fetchall()

    selected = random.sample(rows, min(12, len(rows)))

    return [
        {
            "id": row[0],
            "title": row[1],
            "poster_path": row[2],
            "genre": row[3],
            "overview": row[4],
            "release_date": row[5],
            "popularity": row[6],
            "budget": row[7],
        }
        for row in selected
    ]


@router.get("/movies/{movie_id}")
@cache(expire=900)
async def get_movie_by_id(movie_id: int):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM movies WHERE id = ?", (movie_id,))
        row = cursor.fetchone()

    if row:
        return {
            "id": row[0],
            "title": row[1],
            "poster_path": row[2],
            "genre": row[3],
            "overview": row[4],
            "release_date": row[5],
            "popularity": row[6],
            "budget": row[7],
        }
    else:
        raise HTTPException(status_code=404, detail="Movie not found")
