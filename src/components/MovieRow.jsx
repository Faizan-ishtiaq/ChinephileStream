import { API_KEY, BASE_URL, IMG_URL } from "../api/Tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import useFetch from "../Hooks/useFetch";

import "swiper/css";
import "swiper/css/navigation";

const MovieRow = ({ title, endpoint, mediaType, items, query }) => {

  const safeQuery= (query || "").trim();

  const url=
    safeQuery
    ?`${BASE_URL}/search/${mediaType}?api_key=${API_KEY}&query=${safeQuery}`
    :`${BASE_URL}/${endpoint}?api_key=${API_KEY}`

    const {data:movies,loading,error}=useFetch(
      url,
      safeQuery ?500:0
    );



 

  
  const displayItems = items && items.length > 0 ? items : movies;

  return (
    <div className="mb-5">
      <h2 className="text-3xl text-white mb-4">{title}</h2>

      {loading && <p className="text-white text-3xl text-center">Loading...</p>}
      {error && <p className="text-red-500 text-3xl "> {error}</p>}

   {!loading&&!error&&(
 <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={15}
        breakpoints={{
          320: { slidesPerView: 1 }, // ✅ better mobile
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {displayItems.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="hover:scale-105 transition">
              <img
                src={IMG_URL + movie.poster_path}
                alt={movie.title || movie.name}
                className="rounded-lg w-full"
              />

              <p className="text-center text-white text-xl mt-2">
                {movie.title || movie.name}
              </p>

              <button
                onClick={() =>
                  window.open(
                    mediaType === "movie"
                      ? `https://vsembed.ru/embed/movie/${movie.id}`
                      : `https://vsembed.ru/embed/tv/${movie.id}`,
                    "_blank"
                  )
                }
                className="w-full bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
              >
                Watch Now
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
   )}
     
    </div>
  );
};

export default MovieRow;