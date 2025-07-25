from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.database import get_connection
from app.firebase_auth import verify_firebase_token

router = APIRouter()


class Favorite(BaseModel):
    movie_id: int


@router.post("/favorites")
async def add_favorite(fav: Favorite, user=Depends(verify_firebase_token)):
    user_id = user["uid"]
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)",
            (user_id, fav.movie_id),
        )
        conn.commit()
    return {"message": "Favorite added"}


@router.get("/favorites")
async def get_favorites(user=Depends(verify_firebase_token)):
    user_id = user["uid"]
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT movie_id FROM favorites WHERE user_id = ?", (user_id,))
        rows = cursor.fetchall()
        return [row[0] for row in rows]


@router.delete("/favorites/{movie_id}")
async def delete_favorite(movie_id: int, user=Depends(verify_firebase_token)):
    user_id = user["uid"]
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "DELETE FROM favorites WHERE movie_id = ? AND user_id = ?",
            (movie_id, user_id),
        )
        conn.commit()
    return {"message": "Favorite removed"}
