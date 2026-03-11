import { useEffect,useState } from "react";
import { API_KEY,BASE_URL,IMG_URL } from "../api/Tmdb";

const Home = ({query =""}) =>{
    const [movies,setMovies]=useState([])
    const [searchResult,setSearchResult] = useState("")
   

    useEffect( () =>{
        if(query !=="") return;
       fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => setMovies(data.results))
        .catch(err => console.log(err))
    },[query])

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

   const displayMovies = searchResult.length > 0 ? searchResult : movies;



    return(

         <div className="p-3 mt-8 bg-[#0f0f0f] text-[#d3d3d3]" >
            <div  className="flex flex-wrap gap-6 " >
                {displayMovies.map(movie =>{
                 return   <div key={movie.id} className="w-62 relative group transition-transform duration-300 hover:scale-105" >
                        <img src={IMG_URL + movie.poster_path} alt={movie.title} className="rounded-2xl w-full h-[340px] object-cover" />
                        <div className="absolute inset-0 pointer-events-none bg-black/80 text-white flex flex-col justify-center items-center p-3 opacity-0 group-hover:opacity-100 transition duration-300 rounded-1xl">
                        <p className="font-bold text-lg text-center">Title: {movie.title}</p>
                        <p className="text-sm mt-1">Rating: {movie.vote_average.toFixed(1)}</p>
                        <p className="text-sm">Release: {movie.
release_date.slice(0,4)}</p>
                        <p className="text-sm mt-0.5">Overview :  {movie.overview.slice(0,100)}...</p>
                        </div>
                        <p  className="text-center text-2xl mt-2 h-[60px] flex items-center justify-center">{movie.title}</p>
                         <button 
                        onClick={()=> window.open(`https://vidsrc.win/watch/${movie.id}`)} 
                        className="w-full bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
                            >Watch Movie</button>
                    </div>
                })}

            </div>
            
        </div>
    )
}
export default Home