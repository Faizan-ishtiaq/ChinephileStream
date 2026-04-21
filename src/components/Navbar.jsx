import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import { API_KEY, BASE_URL, IMG_URL } from "../api/Tmdb";

function Navbar({ query, setQuery }) {

const [menuOpen,setMenuOpen] = useState(false)
const [suggestion,setSuggestion]=useState([])
const [showSuggestion,setShowSuggestion]=useState(false)


useEffect(()=>{
  const safeQuery=(query|| "").trim()
  if (safeQuery==="") {
     setSuggestion([]);
     setShowSuggestion(false)     
     return;
  }

  const timer=setTimeout(()=>{
    fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${safeQuery}`)
    .then(res=>res.json())
  .then(data=>{setSuggestion(data.results.slice(0,5))
          
  })
    .catch(err=>console.log(err));
  },400);

  return()=>clearTimeout(timer)

},[query]);

  return (

    <nav className="bg-[#e50914] text-white px-4">

      <div className="flex items-center justify-between h-16">

        {/* Logo */}
        <Link to={"/"}>
          <h1 className="text-xl md:text-3xl font-bold sm:text-lg">
            CinephileStream
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">

          <li className="text-2xl font-bold hover:scale-105 transition">
            <Link to="/movies">Movies</Link>
          </li>

          <li className="text-2xl font-bold hover:scale-105 transition">
            <Link to="/tv_shows">TV Shows</Link>
          </li>

        </ul>

        {/* Search */}
                <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) =>{setQuery(e.target.value)
            setShowSuggestion(true)
          } }
          className="p-2 rounded bg-gray-800 text-white outline-none w-32 sm:w-48"
        />
        { showSuggestion&&suggestion.length>0&&(
          <div className="absolute top-12 left-0 w-full bg-[#141414] text-white rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
            {suggestion.map((item)=>(
              <div className="flex h-auto items-center gap-3 p-2 border-b border-gray-700 hover:bg-gay-800 cursor-pointer" key={item.id} 
              onClick={()=>{
                setQuery(item.title||item.name);
                setSuggestion([]);
                setShowSuggestion(false)
              }
            }> <img src={IMG_URL +item.poster_path} alt="" className="w-10 h-14 object-cover rounded" />
            <div>
              <p className="text-sm font-semi bold">
                {item.title||item.name}
              </p>
              <p className="text-xs text-gray-400">
                {item.media_type?.toUpperCase()}
              </p>
            </div>
              </div>
            ))}
          </div>
        )}
      </div>


        {/* Hamburger */}
        <button
          className="md:hidden text-3xl ml-3"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 pb-4">

          <Link
            to="/movies"
            onClick={() => setMenuOpen(false)}
            className="text-xl font-bold"
          >
            Movies
          </Link>

          <Link
            to="/tv_shows"
            onClick={() => setMenuOpen(false)}
            className="text-xl font-bold"
          >
            TV Shows
          </Link>

        </div>
      )}

    </nav>

  )
}

export default Navbar