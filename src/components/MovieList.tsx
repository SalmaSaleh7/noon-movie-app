import { Movie } from '../store/Movie';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';

interface MovieListProps {
  movies: Movie[] | null;
  isLoading?: boolean;
  error?: Error | null;
}

export default function MovieList({ movies, isLoading, error }: MovieListProps) {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={`Error: ${error.message}`} onRetry={() => window.location.reload()} />;
  if (!movies?.length) return <EmptyState title="No movies found" message="Try a different search" />;

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}