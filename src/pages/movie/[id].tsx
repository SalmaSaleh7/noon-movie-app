import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Movie } from '../../store/Movie'; 
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        if (!res.ok) throw new Error(`Failed to fetch movie (Status: ${res.status})`);
        const data: Movie = await res.json();
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return <ErrorMessage message="Movie not found" />;

  return (
    <div className="movie-details">
      <h1 className="movie-title">{movie.title}</h1>
      
      <div className="movie-poster">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} poster`}
            width={500}
            height={750}
            priority
            className="poster-image"
          />
        ) : (
          <div className="poster-placeholder">No Image Available</div>
        )}
      </div>

      <div className="movie-info">
        <p className="overview">{movie.overview}</p>
        <p className="release-date">
          Released: {new Date(movie.release_date).toLocaleDateString()}
        </p>
        {movie.runtime && (
          <p className="runtime">Runtime: {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</p>
        )}
      </div>
    </div>
  );
}