
import {Link} from "react-router-dom"

function Navbar({query,setQuery}) {
  return (
    <nav className='flex items-center justify-around py-10  h-16 bg-[#e50914] text-white' >
       <div>
  <Link to={"/"}> <h1 className="text-3xl font-bold">CinephileStream</h1></Link>
       </div>

       <div>
        <ul className="flex items-center gap-5 " >
            
              <li  className="text-2xl mx-3 font-bold  transition-transform duration-300 hover:scale-105"><Link to={"/movies"}>Movies</Link></li>
              <li  className="text-2xl mx-3 font-bold  transition-transform duration-300 hover:scale-105"><Link to={"/tv_shows"}>Tv Shows</Link></li>
              
        </ul>
       </div>
       <div>
        <input 
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        className="p-2 rounded bg-gray-800 text-white outline-none"
         />
       </div>
    </nav>
  )
}

export default Navbar