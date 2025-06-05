import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Movie } from './Movie';

interface FavoritesStore {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (movie) => {
        // Prevent duplicates
        if (!get().isFavorite(movie.id)) {
          set((state) => ({
            favorites: [...state.favorites, movie],
          }));
        }
      },
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== id),
        })),
      isFavorite: (id) => get().favorites.some((m) => m.id === id),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'movie-favorites-storage', // unique name for localStorage
      storage: createJSONStorage(() => localStorage), // or sessionStorage
      partialize: (state) => ({ favorites: state.favorites }), // only persist favorites
    }
  )
);