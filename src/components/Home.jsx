import { useEffect,useState } from "react";
import { API_KEY,BASE_URL,IMG_URL } from "../api/Tmdb";

const Home = () =>{
    const [movies,setMovies]=useState([])
   

    useEffect( () =>{
       fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => setMovies(data.results))
        .catch(err => console.log(err))
    },[])
    return(

         <div className="p-3 mt-8 bg-[#0f0f0f] text-[#d3d3d3]" >

              

          

                     
            <div  className="flex flex-wrap gap-6 " >
                {movies.map(movie =>{
                 return   <div key={movie.id} className="w-62 transition-transform duration-300 hover:scale-105" >
                        <img src={IMG_URL + movie.poster_path} alt={movie.title} className="rounded-2xl w-full" />
                        <p  className="text-center text-2xl">{movie.title}</p>
                    </div>
                })}

            </div>
            
        </div>
    )
}
export default Home