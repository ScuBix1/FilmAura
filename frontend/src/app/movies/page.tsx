/* eslint-disable @next/next/no-img-element */
'use client';
import {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  ChangeEvent,
} from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const API_URL = 'http://localhost:3001/tmdb';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [genre, setGenre] = useState<string>('');

  const fetchMovies = useCallback(async () => {
    try {
      let url = `${API_URL}?page=${page}`;
      if (searchQuery) {
        url = `${API_URL}/search?query=${searchQuery}`;
      } else if (genre) {
        url = `${API_URL}/genre/${genre}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Vérifiez la structure des données renvoyées
      console.log(data);

      // Assurez-vous que data est un tableau ou contient un tableau de films
      if (Array.isArray(data)) {
        setMovies(data);
      } else if (data.results && Array.isArray(data.results)) {
        setMovies(data.results);
      } else {
        console.error('Unexpected data structure:', data);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }, [page, searchQuery, genre]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const queryInput = event.currentTarget.elements.namedItem(
      'query'
    ) as HTMLInputElement;
    setPage(1);
    setSearchQuery(queryInput.value);
    setGenre('');
  };

  const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setGenre(event.target.value);
    setSearchQuery('');
  };

  const handleAddToFavorites = (movie: Movie) => {
    console.log('Added to favorites:', movie);
    // Ajoutez ici la logique pour ajouter le film aux favoris
  };

  const handleAddToWatchlist = (movie: Movie) => {
    console.log('Added to watchlist:', movie);
    // Ajoutez ici la logique pour ajouter le film à la watchlist
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">Movies</h1>
      </div>
      <form className="flex justify-center mb-4" onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          placeholder="Search for a movie..."
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
      </form>
      <select
        className="block mx-auto mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        onChange={handleGenreChange}
        value={genre}
      >
        <option value="">All Genres</option>
        <option value="28">Action</option>
      </select>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="bg-white rounded-lg shadow-md overflow-hidden text-center text-black"
          >
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleAddToFavorites(movie)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                >
                  Add to Favorites
                </button>
                <button
                  onClick={() => handleAddToWatchlist(movie)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                >
                  Add to Watchlist
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;
