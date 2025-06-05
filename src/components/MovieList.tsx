import { Movie } from '../store/Movie';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[] | null;
  isLoading?: boolean;
  error?: Error | null;
}

export default function MovieList({ movies, isLoading, error }: MovieListProps) {
  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (!movies || movies.length === 0) {
    return <p className="no-results">No movies found.</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}