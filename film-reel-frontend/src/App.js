import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthRestricted from "./auth/AuthRestricted";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="movies/:id" element={<MovieDetailsPage />} />
        <Route
          path="favorites"
          element={
            <AuthRestricted>
              <FavoritesPage />
            </AuthRestricted>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
