import MovieRow from "./MovieRow"

const Home = ({query}) => {

return(

<div className="p-6 bg-[#0f0f0f] min-h-screen">
<MovieRow
title="Trending Movies"
endpoint="trending/movie/day"
mediaType="movie"
query={query}
/>
<MovieRow
title="Trending Shows"
endpoint="trending/tv/day"
mediaType="tv"
query={query}
/>
<MovieRow
title="Popular Movies"
endpoint="movie/popular"
mediaType="movie"
query={query}
/>
<MovieRow
title="Airing Today Shows"
endpoint="tv/airing_today"
mediaType="tv"
query={query}
/>
<MovieRow
title="Top Rated Movies"
endpoint="movie/top_rated"
mediaType="movie"
query={query}
/>
<MovieRow
title="Top Rated Shows "
endpoint="tv/top_rated"
mediaType="tv"
query={query}
/>
<MovieRow
title="Upcoming Movies"
endpoint="movie/upcoming"
mediaType="movie"
query={query}
/>
<MovieRow
title="On the Air Shows"
endpoint="tv/on_the_air"
mediaType="tv"
query={query}
/>
</div>
)}
export default Home