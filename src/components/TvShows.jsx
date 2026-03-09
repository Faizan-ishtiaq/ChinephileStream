import { useEffect,useState } from "react";
import { API_KEY,BASE_URL,IMG_URL } from "../api/Tmdb";

const TvShows = () =>{
    const [tv,setTv]=useState([])
    const [type,setType]=useState("popular")
    const [page,setPage]=useState(1)

    useEffect( () =>{
        fetch(`${BASE_URL}/tv/${type}?api_key=${API_KEY}&page=${page}`)
        .then(res => res.json())
        .then(data => setTv(data.results))
        .catch(err => console.log(err))
        
    },[type,page])

    const handleTypeChange=(newType)=>{
    setType(newType)
    setPage(1)

    }

    return(

         <div className="p-3 mt-8 bg-[#0f0f0f] text-[#d3d3d3]" >

               

            
            <h1 className="text-center text-5xl font-bold mb-3 text-white" > TV Series</h1>
             <button className={ type ==="popular" ? "bg-red-800 border-amber-50 text-white m-4 p-3  px-4 py-3 rounded-full transition-transform duration-300 hover:scale-105" : "bg-red-600 text-white m-4 p-3  px-4 py-3 rounded-full transition-transform duration-300 hover:scale-105"} onClick={()=>handleTypeChange("popular")}>Popular</button>
             <button  className={ type==="airing_today" ? "bg-red-800 border-amber-50 text-white m-4 p-3  px-4 py-3 rounded-full transition-transform duration-300 hover:scale-105" : "bg-red-600 text-white m-4 p-3  px-4 py-3 rounded-full transition-transform duration-300 hover:scale-105"} onClick={()=>handleTypeChange("airing_today")}>Air-Today</button>
             <button className={ type==="on_the_air" ? "bg-red-800 border-amber-50 text-white m-4 p-3  px-4 py-3 rounded-full transition-transform duration-300 hover:scale-105" : "bg-red-600 text-white m-4 p-3  px-4 py-3 rounded-full transition-transform duration-300 hover:scale-105"} onClick={()=>handleTypeChange("on_the_air")}>On Tv</button>
             <button  className={ type==="top_rated" ? "bg-red-800 border-amber-50 text-white m-4 p-3  px-4 py-3 rounded-full transition-transform duration-300 hover:scale-105" : "bg-red-600 text-white m-4 p-3  px-4 py-3 rounded-full transition-transform duration-300 hover:scale-105"} onClick={()=>handleTypeChange("top_rated")}>Top Rated</button>


            <div  className="flex flex-wrap gap-6 " >
                {tv.map(series =>{
                 return   <div key={series.id} className="w-62 transition-transform duration-300 hover:scale-105">
                        <img src={IMG_URL + series.poster_path} alt={series.title} className="rounded-2xl w-full" />
                        <p className="text-center text-2xl">{series.name}</p>
                         <button 
                        onClick={()=> window.open(`https://vidsrc.win/watch/${series.id}?s=1&e=1`,"_blank")} 
                        className="w-full bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
                            >Watch </button>
                       
                    </div>
                })}

            </div>
             <div className="flex justify-center gap-4 mt-6" >
                <button 
                onClick={()=>setPage(page-1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded"
                 > Previous</button>
                    <p className="px-4 py-2 text-white font-bold">Page {page}</p>
                     <button 
                onClick={()=>setPage(page+1)}
                className="px-4 py-2 bg-gray-700 text-white rounded"
                    > Next</button>
            </div>
            
        </div>
    )
}
export default TvShows