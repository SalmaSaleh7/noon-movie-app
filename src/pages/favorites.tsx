import { useFavoritesStore } from '../store/favoritesStore';
import MovieList from '../components/MovieList';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import styles from '../styles/Home.module.css';

export default function Favorites() {
  const { favorites } = useFavoritesStore();

  return (
    <div className={styles.moviehomePage}>
      <Header />
      <main className={styles.searchContent}>
        <h1 className={styles.sectionTitle}>Your Favorites</h1>
        {favorites.length > 0 ? (
          // Use the grid class here to display cards side-by-side
          <div className={styles.favoritesGrid}>
            <MovieList movies={favorites} />
          </div>
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
