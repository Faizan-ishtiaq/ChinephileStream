import MovieRow from "./MovieRow"

const Home = () => {

return(

<div className="p-6 bg-[#0f0f0f] min-h-screen">

<MovieRow
title="Trending Movies"
endpoint="trending/movie/day"
/>
<MovieRow
title="Trending Shows"
endpoint="trending/tv/day"
/>
<MovieRow
title="Popular Movies"
endpoint="movie/popular"
/>
<MovieRow
title="Airing Today Shows"
endpoint="tv/airing_today"
/>
<MovieRow
title="Top Rated Movies"
endpoint="movie/top_rated"
/>
<MovieRow
title="Top Rated Shows "
endpoint="tv/top_rated"
/>


<MovieRow
title="Upcoming Movies"
endpoint="movie/upcoming"
/>


<MovieRow
title="On the Air Shows"
endpoint="tv/on_the_air"
/>




</div>

)

}

export default Home