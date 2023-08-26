import React , {useEffect,useState} from 'react';
import Card from '../../Components/Card/Card.js';
import Pages from '../../Components/Pagination/Pages.js';
import axios from 'axios';
import Genre from '../../Components/Genre/Genre.js';
import './Movies.css';

const Movies = () => {
  const [page,setPage] = useState(1);
  const [movies,setMovies] = useState([]);
  const [noofpages,setnoofpages] = useState();
  const [selectedGenre,setSelectedGenre] = useState([]);
  const [remainingGenre,setRemainingGenre] = useState([]);
  function handleGenre(selected){
    if(selected.length < 1)return "";

    const genreIds = selected.map(s => s.id);
    return genreIds.reduce( (acc,curr) => acc+","+curr);
  }
  const genreList = handleGenre(selectedGenre);

  const movieapi = async() => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreList}`);
    setMovies(data.results);
    setnoofpages(data.total_pages);
  };

  useEffect(() => {
    movieapi();
  },[page,selectedGenre]);

  return (
    <div>
        <span className='navtitle'>MOVIES</span>
        <div style={{border:'1px solid rgba(99,99,99,0.7',margin:'5px',borderRadius:'5px'}}>
        <span className='genreTitle'>Explore movies under different &nbsp;<i>genre's</i></span>
        <hr className='genre_hr'></hr>
        <Genre
        type='movie' 
        selected={selectedGenre} 
        remaining={remainingGenre} 
        setSelectedGenre={setSelectedGenre} 
        setRemainingGenre={setRemainingGenre} 
        setPage={setPage}
        />
        </div>
        <div className='mov'>
          {
            
            (movies.length > 0) ? movies.map(m => (
              <Card 
              id={m.id}
              desc={m.overview ? (m.overview.length <= 135) ? m.overview : m.overview.slice(0,135)+"..." : "We don't have an overview translated in English. "}
              poster={m.poster_path}
              title={m.title || m.name}
              year={m.release_date ? m.release_date.slice(0,4) : ""}
              rating={m.vote_average ? "⭐"+m.vote_average : "⭐--"}
              media="movie"
              />
            ))
            :
            <span style={{display:'flex'}}>No such movies found !</span>
          }
        </div>
        <Pages setPage={setPage} no_of_pages={(noofpages <= 500) ? noofpages : 500} />
    </div>
  );
};

export default Movies;