import { useState, useEffect, useCallback } from 'react';
import MovieList from '../components/MovieList';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { Movie } from '../store/Movie';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import MovieCard from '../components/MovieCard';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [randomMovies, setRandomMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRandom, setIsLoadingRandom] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch searched movies
  const fetchMovies = useCallback(async () => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      if (!res.ok) throw new Error(`Failed to fetch movies (Status: ${res.status})`);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  // Fetch random popular movies
  const fetchRandomMovies = useCallback(async () => {
    setIsLoadingRandom(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${Math.floor(Math.random() * 5) + 1}`
      );
      if (!res.ok) throw new Error('Failed to fetch random movies');
      const data = await res.json();
      // Get 12 random movies from popular results
      const shuffled = [...data.results].sort(() => 0.5 - Math.random());
      setRandomMovies(shuffled.slice(0, 15));
    } catch (err) {
      console.error('Error fetching random movies:', err);
    } finally {
      setIsLoadingRandom(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, fetchMovies]);

  useEffect(() => {
    fetchRandomMovies();
  }, [fetchRandomMovies]);

  return (
    <div className={styles.homePage}>
      <Header />
      <main className={styles.searchContent}>
        <div className={styles.searchContainer}>
          <SearchBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            isLoading={isLoading}
            placeholder="Search for movies..."
          />
        </div>
        
        {isLoading && query ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage 
            message={error}
            onRetry={() => fetchMovies()}
          />
        ) : (
          <>
            {query ? (
              !movies.length ? (
                <ErrorMessage 
                  message="No movies found. Try a different search term."
                  variant="info"
                />
              ) : (
                <MovieList movies={movies} />
              )
            ) : (
              <div className={styles.randomSection}>
                <h2 className={styles.sectionTitle}>Featured Movies</h2>
                {isLoadingRandom ? (
                  <div className={styles.loadingContainer}>
                    <LoadingSpinner size="medium" />
                  </div>
                ) : (
                  <>
                    <div className={styles.randomMovies}>
                      {randomMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    </div>
                    <button 
                      className={styles.refreshButton}
                      onClick={fetchRandomMovies}
                    >
                      Refresh Recommendations
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}