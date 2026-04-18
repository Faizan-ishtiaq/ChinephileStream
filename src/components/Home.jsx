import MovieRow from "./MovieRow"

const Home = ({query}) => {

return(

    

<div className="p-6 bg-[#0f0f0f] min-h-screen">

    {
    query?
    <>
    <MovieRow
title="Search result: Movies" 
endpoint="trending/movie/day"
mediaType="movie"
query={query}
/>
<MovieRow
title="Search result: Series "
endpoint="trending/tv/day"
mediaType="tv"
query={query}
/>
    </>

:
<>
<MovieRow
title="Popular Movies"
endpoint="movie/popular"
mediaType="movie"

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

/>
<MovieRow
title="Top Rated Shows "
endpoint="tv/top_rated"
mediaType="tv"

/>
<MovieRow
title="Upcoming Movies"
endpoint="movie/upcoming"
mediaType="movie"

/>
<MovieRow
title="On the Air Shows"
endpoint="tv/on_the_air"
mediaType="tv"

/>

</>
}


</div>
)}
export default Home