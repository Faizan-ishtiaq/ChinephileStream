import { Link } from "react-router-dom"
import { useState } from "react"

function Navbar({ query, setQuery }) {

const [menuOpen,setMenuOpen] = useState(false)

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
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white outline-none w-32 sm:w-48"
        />

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