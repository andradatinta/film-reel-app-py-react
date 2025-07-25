from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.database import get_connection
from app.firebase_auth import verify_firebase_token

router = APIRouter()


class Review(BaseModel):
    movie_id: int
    user_full_name: str
    rating: float
    text: str


@router.post("/reviews")
async def add_review(review: Review, user=Depends(verify_firebase_token)):
    user_id = user["uid"]
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO reviews (movie_id, user_id, user_full_name, rating, text)
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                review.movie_id,
                user_id,
                review.user_full_name,
                review.rating,
                review.text,
            ),
        )
        conn.commit()
    return {"message": "Review added"}


@router.get("/reviews/{movie_id}")
async def get_reviews(movie_id: int, user=Depends(verify_firebase_token)):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT user_full_name, rating, text
            FROM reviews
            WHERE movie_id = ?
            """,
            (movie_id,),
        )
        rows = cursor.fetchall()
        return [
            {"user_full_name": row[0], "rating": row[1], "text": row[2]} for row in rows
        ]
