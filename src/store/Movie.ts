export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  runtime?: number;
  genres?: {
    id: number;
    name: string;
  }[];
  credits?: {
    cast?: {
      id: number;
      name: string;
      character: string;
    }[];
    crew?: {
      id: number;
      name: string;
      job: string;
    }[];
  };
}

// Type guard for Movie
export function isMovie(data: unknown): data is Movie {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'title' in data &&
    'overview' in data
  );
}

// Utility type for API responses
export interface ApiResponse<T> {
  results?: T[];
  page?: number;
  total_pages?: number;
  total_results?: number;
}