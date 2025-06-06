# Movie Search App

A Next.js application that allows users to search for movies, view detailed information, and manage a list of favorite movies using data from the TMDB API.

## Features

- Search movies by title
- View comprehensive movie details
- Add/remove movies from favorites
- Responsive design for all devices
- Persistent favorites using local storage
- Loading states and error handling
- Performance optimizations

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Zustand (state management)
- TMDB API
- CSS Modules
- Bun (package manager)
- ESLint (code quality)

## Installation

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd movie-search-app

2. **Install dependencies**:
   ```bash
   npm install

3. **Set up environment variables**:
Create a .env.local file in the root directory with your TMDB API key:
   ```bash
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here

4. **Run the development server**:
   ```bash
   bun run dev

5-Open in your browser:
The app will be running at http://localhost:3000


Design Decisions:
Architecture:
1-Used Next.js App Router for better routing and server components
2-Implemented a clean component structure with separation of concerns
3-Used Zustand for client-side state management (favorites)

Additional Features Implemented:
1-Server-Side Rendering:
Used React Server Components where appropriate
Implemented getServerSideProps for movie details page

2-Animations:
Added subtle transitions for favorite toggles
Implemented smooth loading animations

3-Pagination:
Added "Load More" functionality for search results