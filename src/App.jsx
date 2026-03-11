import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { useState } from 'react'
import Movies from './components/Movies'
import Navbar from './components/Navbar'
import TvShows from './components/TvShows'
import Home from './components/Home'

 


function App() {

  const [query,setQuery]=useState("")
  return (
    <BrowserRouter>
    
   <div>
      <Navbar query={query} setQuery={setQuery} />
     
    
    </div>
     <Routes>
      <Route path='/' element={<Home query={query} />} />
      <Route path='/movies' element={<Movies query={query} />} />
       <Route path='/tv_shows' element={<TvShows query={query} />} />
    </Routes>

   
    </BrowserRouter>
  )
}

export default App