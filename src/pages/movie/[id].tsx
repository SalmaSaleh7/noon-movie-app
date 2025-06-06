import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Movie } from '../../store/Movie';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import styles from '../../styles/MovieDetails.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.title}>{movie.title}</h1>
      <div className={styles.content}>
        <div className={styles.posterWrapper}>
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
              width={400}
              height={600}
              className={styles.poster}
              priority
            />
          ) : (
            <div className={styles.posterPlaceholder}>No Image Available</div>
          )}
        </div>
        <div className={styles.info}>
          <p className={styles.overview}>{movie.overview || "No overview available."}</p>
          <div className={styles.details}>
            <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
            {movie.runtime && (
              <p>
                <strong>Runtime:</strong> {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </p>
            )}
            {movie.genres && movie.genres.length > 0 && (
              <p>
                <strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}
              </p>
            )}
            {movie.vote_average && (
              <p>
                <strong>Rating:</strong> {movie.vote_average} / 10
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
