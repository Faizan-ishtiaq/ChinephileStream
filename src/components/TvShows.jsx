import { useEffect,useState } from "react";
import { API_KEY,BASE_URL,IMG_URL } from "../api/Tmdb";

const TvShows = () =>{
    const [tv,setTv]=useState([])
    const [type,setType]=useState("popular")

    useEffect( () =>{
        fetch(`${BASE_URL}/tv/${type}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => setTv(data.results))
        .catch(err => console.log(err))
        
    },[type])

    return(

         <div className="p-3 mt-8 bg-[#0f0f0f] text-[#d3d3d3]" >

               

            
            <h1 className="text-center text-5xl font-bold mb-3 text-white" > TV Series</h1>
             <button  className="bg-red-600 text-white m-4 p-3  px-4 py-3 rounded-full transition-transform duration-300 hover:scale-105" onClick={()=>setType("top_rated")}>Top Rated</button>
             <button  className="bg-red-600 text-white m-4 p-3  px-4 py-3 rounded-full transition-transform duration-300 hover:scale-105">Air-Today</button>
             <button className="bg-red-600 text-white m-4 p-3  px-4 py-3 rounded-full transition-transform duration-300 hover:scale-105" onClick={()=>setType("on_the_air")}>On Tv</button>
             <button  className="bg-red-600 text-white m-4 p-3  px-4 py-3 rounded-full transition-transform duration-300 hover:scale-105" onClick={()=>setType("popular")}>Popular</button>


            <div  className="flex flex-wrap gap-6 " >
                {tv.map(series =>{
                 return   <div key={series.id} className="w-62 transition-transform duration-300 hover:scale-105">
                        <img src={IMG_URL + series.poster_path} alt={series.title} className="rounded-2xl w-full" />
                        <p className="text-center text-2xl">{series.name}</p>
                       
                    </div>
                })}

            </div>
            
        </div>
    )
}
export default TvShows