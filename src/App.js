import { Container } from '@mui/material';
import './App.css';
import Header from './Components/Header/Header.js';
import SimpleBottomNavigation from './Components/Navbar/Navbar.js';
import { BrowserRouter, Routes,Route} from "react-router-dom";
import Movies from './Pages/Movies/Movies.js';
import Trending from './Pages/Trending/Trending.js';
import Series from './Pages/Series/Series.js';
import Search from './Pages/Search/Search.js';

function App() {
  return (
    <BrowserRouter>
          <Header />
          <div className='app'>
            <Container>
              <Routes>
                <Route path="/" element={<Trending />} exist/>
                <Route path="/movies" element={<Movies />}/>
                <Route path="/series" element={<Series />}/>
                <Route path="/search" element={<Search />}/>
              </Routes>
            </Container>
          </div>
          <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
