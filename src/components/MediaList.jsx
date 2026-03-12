import { useEffect, useState } from "react";
import { API_KEY, BASE_URL, IMG_URL } from "../api/Tmdb";

const MediaList = ({ mediaType, query }) => {
  const [items, setItems] = useState([]);
  const [type, setType] = useState("popular");
  const [page, setPage] = useState(1);
  const [searchResult, setSearchResult] = useState([]);

  const safeQuery = (query || "").trim();

  useEffect(() => {
    if (safeQuery !== "") return;

    fetch(`${BASE_URL}/${mediaType}/${type}?api_key=${API_KEY}&page=${page}`)
      .then((res) => res.json())
      .then((data) => setItems(data.results))
      .catch((err) => console.log(err));
  }, [mediaType, type, page, safeQuery]);

  useEffect(() => {
    if (safeQuery === "") {
      setSearchResult([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`
        ${BASE_URL}/search/${mediaType}?api_key=${API_KEY}&query=${safeQuery}&page=1`
      )
        .then((res) => res.json())
        .then((data) => setSearchResult(data.results))
        .catch((err) => console.log(err));
    }, 500);

    return () => clearTimeout(timer);
  }, [mediaType, safeQuery]);

  const handleTypeChange = (newType) => {
    setType(newType);
    setPage(1);
  };

  const displayItems = searchResult.length > 0 ? searchResult : items;

  const buttons =
    mediaType === "movie"
      ? ["popular", "top_rated", "now_playing", "upcoming"]
      : ["popular", "airing_today", "on_the_air", "top_rated"];

  const title = mediaType === "movie" ? "Movies" : "TV Series";

  return (
    <div className="p-3 mt-8 bg-[#0f0f0f] text-[#d3d3d3]">
      <h1 className="text-center text-5xl font-bold mb-3 text-white">
        {title}
      </h1>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-5">
        {buttons.map((btn) => (
          <button
            key={btn}
            className={`px-4 py-2 rounded ${
              type === btn ? "bg-gray-900 text-white" : "bg-gray-700 text-white"
            }`}
            onClick={() => handleTypeChange(btn)}
            disabled={searchResult.length > 0}
          >
            {btn.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {displayItems.map((item) => {
          const itemTitle = item.title || item.name;
          const releaseDate = item.release_date || item.first_air_date;

          return (
            <div
              key={item.id}
              className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] xl:w-[18%] relative group transition-transform duration-300 hover:scale-105"
            >
              <img
                src={IMG_URL + item.poster_path}
                alt={itemTitle}
                className="rounded-2xl w-full h-[430px] sm:h-[300px] md:h-[400px] lg:h-[430px] xl:h-[300px] object-cover"
              />

              <div className="absolute inset-0 pointer-events-none bg-black/80 text-white flex flex-col justify-center items-center p-3 opacity-0 group-hover:opacity-100 transition duration-300 rounded-1xl">
                <p className="font-bold text-lg text-center">
                  Title: {itemTitle}
                </p>

                <p className="text-sm mt-1">
                  Rating: {item.vote_average?.toFixed(1)}
                </p>

                <p className="text-sm">
                  Release: {releaseDate?.slice(0, 4)}
                </p>

                <p className="text-sm mt-0.5">
                  Overview: {item.overview?.slice(0, 100)}...
                </p>
              </div>

              <p className="text-center text-2xl mt-2 h-[60px] flex items-center justify-center">
                {itemTitle}
              </p>

              <button
                onClick={() =>
                  window.open(
                    mediaType === "movie"
                      ? `https://vsembed.ru/embed/movie/${item.id}`
                      : `https://vsembed.ru/embed/tv/${item.id}`,
                    "_blank"
                  )
                }
                className="w-full bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
              >
                Watch Now
              </button>
            </div>
          );
        })}
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

export default MediaList;