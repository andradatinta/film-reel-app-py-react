from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.database import (
    create_movies_table,
    create_favorites_table,
    create_reviews_table,
)

from app.routes import movies, favorites, reviews


@asynccontextmanager
async def lifespan(app: FastAPI):
    # code that runs at startup
    create_movies_table()
    create_favorites_table()
    create_reviews_table()
    yield


app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(movies.router)
app.include_router(favorites.router)
app.include_router(reviews.router)
