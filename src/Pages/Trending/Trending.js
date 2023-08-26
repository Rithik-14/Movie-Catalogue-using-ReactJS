import  axios from 'axios';
import {useState,useEffect} from 'react';
import Card from '../../Components/Card/Card.js';
import './Trending.css';
import Pages from '../../Components/Pagination/Pages.js';

const Trending = () => {
  
  const [trends,setTrends] = useState([]);
  const [page,setPage] = useState(1);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
    .then(res => res.json())
    .then(data => setTrends(data.results));
  },[page]);

  return (
    <div>
        <span className='navtitle'>TRENDING TODAY</span>
        <div className='trending'>
          {
            trends && trends.map(t => (
              <Card 
              id={t.id}
              desc={t.overview ? (t.overview.length <= 135) ? t.overview : t.overview.slice(0,135)+"..." : "We don't have an overview translated in English. "}
              poster={t.poster_path}
              title={t.title || t.name}
              year={t.release_date ? t.release_date.slice(0,4) : ""}
              rating={t.vote_average ? "⭐"+t.vote_average : "⭐--"}
              media={t.media_type}
              />
              ))
          }
        </div>
        <Pages setPage={setPage}/>
    </div>
  );
};

export default Trending;