import React, { useEffect, useState } from 'react'
import './Series.css';
import Genre from '../../Components/Genre/Genre.js';
import Card from '../../Components/Card/Card.js';
import Pages from '../../Components/Pagination/Pages.js';
import axios from 'axios';

function Series() {
  
  const [page,setPage] = useState(1);
  const [series,setSeries] = useState([]);
  const [noofpages,setnoofpages] = useState();
  const [selectedGenre,setSelectedGenre] = useState([]);
  const [remainingGenre,setRemainingGenre] = useState([]);
  function handleGenre(selected)
  {
    if(selected.length < 1)return "";

    const genreCodes = selected.map(s => s.id);
    return genreCodes.reduce((acc,curr) => acc+","+curr);
  }
  const genreList = handleGenre(selectedGenre);
  
  const seriesapi = async() => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreList}`);
    setSeries(data.results);
    setnoofpages(data.total_pages);
  };

  useEffect(() => {
    seriesapi();
  },[page,genreList]);
  
  return (
    <div>
      <span className='navtitle'>SERIES</span>
      <div style={{border:'1px solid rgba(99,99,99,0.7',margin:'5px',borderRadius:'5px'}}>
      <span className='genreTitle'>Choose TV shows from different &nbsp;<i>genre's</i></span>
      <hr className='genre_hr'></hr>
      <Genre
        type='tv' 
        selected={selectedGenre} 
        remaining={remainingGenre} 
        setSelectedGenre={setSelectedGenre} 
        setRemainingGenre={setRemainingGenre} 
        setPage={setPage}
        />
        </div>
        <div className='tv'>
          {
            (series.length > 0) ? series.map(s => (
              <Card 
              id={s.id}
              desc={s.overview ? (s.overview.length <= 135) ? s.overview : s.overview.slice(0,135)+"..." : "We don't have an overview translated in English. "}
              poster={s.poster_path}
              title={s.title || s.name}
              year={s.release_date ? s.release_date.slice(0,4) : ""}
              rating={s.vote_average ? "⭐"+s.vote_average : "⭐--"}
              media="tv"
              />
            ))
            :
            <span style={{display:'flex'}}>No such TV Series found !</span>
          }
        </div>
        <Pages setPage={setPage} no_of_pages={(noofpages <= 500) ? noofpages : 500} />
    </div>
  )
}

export default Series;