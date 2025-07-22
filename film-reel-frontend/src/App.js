import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
