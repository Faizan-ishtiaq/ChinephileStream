import { useEffect, useState } from "react";
import { API_KEY, BASE_URL, IMG_URL } from "../api/Tmdb";

const Movies = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState("popular");
  const [page, setPage] = useState(1);
  const [searchResult, setSearchResult] = useState([]);

  // Fetch default type movies
  useEffect(() => {
    if (query.trim() !== "") return; // skip if searching

    fetch(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&page=${page}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.log(err));
  }, [type, page, query]);

  // Fetch search results
  useEffect(() => {
    if (query.trim() === "") {
      setSearchResult([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=1`)
        .then((res) => res.json())
        .then((data) => setSearchResult(data.results))
        .catch((err) => console.log(err));
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleTypeChange = (newType) => {
    setType(newType);
    setPage(1);
  };

  // Correctly declared outside JSX
  const displayMovies = searchResult.length > 0 ? searchResult : movies;

  return (
    <div className="p-3 mt-8 bg-[#0f0f0f] text-[#d3d3d3]">
      <h1 className="text-center text-5xl font-bold mb-3 text-white">Movies</h1>

      {/* Type Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-5">
        {["popular", "top_rated", "now_playing", "upcoming"].map((btn) => (
          <button
            key={btn}
            className={`px-4 py-2 rounded ${
              type === btn ? "bg-gray-900 text-white" : "bg-gray-700 text-white"
            }`}
            onClick={() => handleTypeChange(btn)}
            disabled={searchResult.length > 0} // optional: disable during search
          >
            {btn.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      <div className="flex flex-wrap gap-6">
        {displayMovies.map((movie) => (
          <div
            key={movie.id}
            className="w-62 relative group transition-transform duration-300 hover:scale-105"
          >
            <img
              src={IMG_URL + movie.poster_path}
              alt={movie.title}
              className="rounded-2xl w-full h-[340px] object-cover"
            />

            <div className="absolute inset-0 pointer-events-none bg-black/80 text-white flex flex-col justify-center items-center p-3 opacity-0 group-hover:opacity-100 transition duration-300 rounded-1xl">
              <p className="font-bold text-lg text-center">Title: {movie.title}</p>
              <p className="text-sm mt-1">
                Rating: {movie.vote_average?.toFixed(1)}
              </p>
              <p className="text-sm">
                Release: {movie.release_date?.slice(0, 4)}
              </p>
              <p className="text-sm mt-0.5">
                Overview: {movie.overview?.slice(0, 100)}...
              </p>
            </div>

            <p className="text-center text-2xl mt-2 h-[60px] flex items-center justify-center">
              {movie.title}
            </p>
            <button
              onClick={() => window.open(`https://vidsrc.win/watch/${movie.id}`)}
              className="w-full bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
            >
              Watch Movie
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {searchResult.length === 0 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          >
            Previous
          </button>
          <p className="px-4 py-2 text-white font-bold">Page {page}</p>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Movies;