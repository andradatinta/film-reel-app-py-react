import firebase_admin
from firebase_admin import credentials, auth
from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

if not firebase_admin._apps:
    cred = credentials.Certificate(
        "app/film-reel-auth-firebase-adminsdk-fbsvc-dd84c928a1.json"
    )
    firebase_admin.initialize_app(cred)

security = HTTPBearer()


async def verify_firebase_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    token = credentials.credentials

    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
