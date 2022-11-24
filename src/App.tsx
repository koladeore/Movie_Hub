import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Trending } from './pages/Trending/Trending'
import { Movies } from './pages/Movies/Movies'
import { Series } from './pages/Series/Series'
import { NotFound } from './pages/NotFound/NotFound'
import { Search } from './pages/Search/Search'
import { Details } from './pages/Details/Details'

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
            <Route path='/details/:id' element={<Details />}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
