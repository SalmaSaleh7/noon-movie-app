import { Movie } from '../store/Movie';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';
import styles from '../styles/MovieList.module.css';

interface MovieListProps {
  movies: Movie[] | null;
  isLoading?: boolean;
  error?: Error | null;
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
}

export default function MovieList({
  movies,
  isLoading,
  error,
  onLoadMore,
  hasMore,
  className
}: MovieListProps) {
  // Handle all loading, error, and empty states
  if (isLoading && !movies) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={`Error: ${error.message}`} onRetry={() => window.location.reload()} />;
  if (!movies?.length) return <EmptyState title="No movies found" message="Try a different search" />;

  return (
    <div className={`${styles.movieGrid} ${className || ''}`}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      
      {/* Show loading spinner at the bottom when loading more items */}
      {isLoading && movies.length > 0 && (
        <div className={styles.loadingContainer}>
          <LoadingSpinner size="small" />
        </div>
      )}
      
      {/* Show load more button if there are more items to load */}
      {hasMore && !isLoading && onLoadMore && (
        <button
          onClick={onLoadMore}
          className={styles.loadMoreButton}
          aria-label="Load more movies"
        >
          Load More
        </button>
      )}
    </div>
  );
}