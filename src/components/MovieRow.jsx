import { useEffect, useState } from "react"
import { API_KEY, BASE_URL, IMG_URL } from "../api/Tmdb"
import {Swiper,SwiperSlide} from "swiper/react"
import {Navigation} from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
const MovieRow = ({ title, endpoint }) => {

const [movies,setMovies] = useState([])

useEffect(()=>{

fetch(`${BASE_URL}/${endpoint}?api_key=${API_KEY}`)
.then(res=>res.json())
.then(data=>setMovies(data.results))

},[endpoint])

return(

<div className="mb-10">

<h2 className="text-3xl text-white mb-4">{title}</h2>

<Swiper
modules={[Navigation]}
navigation
spaceBetween={15}
breakpoints={{
320:{slidesPerView:2},
640:{slidesPerView:3},
768:{slidesPerView:4},
1024:{slidesPerView:6}
}}
>

{movies.map(movie=>(
<SwiperSlide key={movie.id}>

<div className="hover:scale-105 transition">

<img
src={IMG_URL + movie.poster_path}
alt={movie.title}
className="rounded-lg w-full"
/>

<p className="text-center text-sm mt-2">{movie.title}</p>

  

</div>

</SwiperSlide>
))}

</Swiper>

</div>

)

}

export default MovieRow