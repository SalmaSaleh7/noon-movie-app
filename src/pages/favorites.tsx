import { useFavoritesStore } from '../store/favoritesStore';
import MovieList from '../components/MovieList';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';

export default function Favorites() {
  const { favorites } = useFavoritesStore();

  return (
    <div className="favorites-page">
      <Header />
      <main className="favorites-content">
        <h1 className="page-title">Your Favorites</h1>
        {favorites.length > 0 ? (
          <MovieList movies={favorites} />
        ) : (
          <EmptyState 
            title="No favorites yet"
            message="Search for movies and add them to your favorites!"
          />
        )}
      </main>
    </div>
  );
}