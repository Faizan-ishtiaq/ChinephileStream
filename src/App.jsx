import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Movies from './components/Movies'
import Navbar from './components/Navbar'
import TvShows from './components/TvShows'
import Home from './components/Home'


function App() {
  return (
    <BrowserRouter>
    
   <div>
      <Navbar />
     
    
    </div>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/movies' element={<Movies />} />
       <Route path='/tv_shows' element={<TvShows />} />
    </Routes>

   
    </BrowserRouter>
  )
}

export default App