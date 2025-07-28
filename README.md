# 🎥 Film Reel

**Film Reel** is a full-stack movie browsing application that allows users to:

- 🔍 Explore popular movies fetched from **The Movie Database (TMDB) API**
- 💞 Save movies to their **Favorites** list
- 📝 Leave **reviews** and ratings for each movie
- 🔐 Securely **sign up, log in, and manage sessions** using **Firebase Authentication**

The project is built using **React + FastAPI** and is fully containerized with **Docker Compose** for easy deployment and scalability.

---

## 🌎 Live Features

- 🎥 View randomly selected popular movies from TMDB
- ℹ️ Fetch and display **detailed info** for each movie
- 📄 **Submit and view reviews** (with name, rating, and text)
- 🔊 Interactive UI using **TailwindCSS + MUI**
- 🛡️ Full **user authorization with JWT tokens** (via Firebase)
- 🏐 Interactive **FastAPI Swagger UI** at [`/docs`](http://localhost:8000/docs)

---

## 📝 API Overview (FastAPI Swagger)

### Movie Endpoints

- `GET /movies` - List all seeded movies
- `GET /movies/{movie_id}` - Fetch full movie details by ID

### Favorites (Protected)

- `GET /favorites` - Fetch all user-favorited movie IDs
- `POST /favorites` - Add a movie to favorites
- `DELETE /favorites/{movie_id}` - Remove movie from favorites

### Reviews (Protected)

- `GET /reviews/{movie_id}` - Get all reviews for a movie
- `POST /reviews` - Submit a review (with `movie_id`, `user_full_name`, `rating`, and `text`)

All protected routes require a valid Firebase **Bearer Token** in the Authorization header.

---

## 🧬 Technologies Used

### Frontend

- ☑️ **React 18**
- ☑️ **React Router 6**
- ☑️ **Redux Toolkit**
- ☑️ **Firebase Auth SDK**
- ☑️ **Axios**
- ☑️ **TailwindCSS** & **Material UI (MUI)**

### Backend

- ☑️ **FastAPI 0.110+**
- ☑️ **httpx** for async TMDB calls
- ☑️ **SQLite** for lightweight storage
- ☑️ **Firebase Admin SDK** for secure JWT decoding
- ☑️ **CORS Middleware** for cross-origin requests

### DevOps

- ☑️ **Docker** + **Docker Compose**
- ☑️ `.dockerignore` for optimized builds
- ☑️ Separate containers for **frontend** and **backend**

---

## 🏃🏼‍♂️ Quick Start

### Clone and Run with Docker

```bash
git clone https://github.com/your-username/film-reel-app.git
cd film-reel-app
docker-compose up --build
```

### Run Locally

#### Backend

```bash
cd film-reel-backend
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend

```bash
cd film-reel-frontend
npm install
npm start
```

---

## 🔐 Environment Setup

### `.env` (Frontend)

```env
REACT_APP_TMDB_KEY=your_tmdb_key
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
```

### Firebase Admin SDK (Backend)

Store your private key inside:

```bash
film-reel-backend/app/firebase-admin-key.json
```

---

## 💡 Additional Notes

- Uses **Bearer Token Auth** extracted from Firebase for route protection
- Automatically **creates DB schema** at startup via FastAPI lifespan hook
- TMDB data is seeded via a `scripts/seed_movies.py` script

---

## 🎉 Future Enhancements

- Google OAuth2
- Email Verification
- Pagination for `/movies`
- Cloud Deployment (Render, Fly.io, Railway)
