import styles from '../styles/MovieCard.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useFavoritesStore } from '../store/favoritesStore';
import { Movie } from '../store/Movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation when clicking favorite
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className={styles.card}>
      <Link href={`/movie/${movie.id}`} passHref legacyBehavior>
        <a className={styles.cardLink}>
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={`Poster for ${movie.title}`}
              width={300}
              height={450}
              className={styles.poster}
              priority={false}
              placeholder="blur"
              blurDataURL="/placeholder-image.jpg"
            />
          ) : (
            <div className={styles.posterPlaceholder}>No image available</div>
          )}
          <div className={styles.cardContent}>
            <h2 className={styles.title}>{movie.title}</h2>
            <p className={styles.releaseDate}>
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Year unknown'}
            </p>
          </div>
        </a>
      </Link>

      <button
        onClick={toggleFavorite}
        className={styles.favoriteButton}
        aria-label={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite(movie.id) ? '❤️ Remove' : '🤍 Favorite'}
      </button>
    </div>
  );
}