import { useState, useEffect, useCallback } from 'react';
import MovieList from '../components/MovieList';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { Movie } from '../store/Movie'; // Updated import path
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, fetchMovies]);

  return (
    <div className="home-page">
      <Header />
      <main className="search-content">
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          isLoading={isLoading}
          placeholder="Search for movies..."
        />
        
        {isLoading && query ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage 
            message={error}
            onRetry={() => fetchMovies()}
          />
        ) : (
          <>
            {query && !movies.length ? (
              <ErrorMessage 
                message="No movies found. Try a different search term."
                variant="info"
              />
            ) : (
              <MovieList movies={movies} />
            )}
          </>
        )}
      </main>
    </div>
  );
}