import React , {useState,useEffect} from 'react';
import axios from 'axios';
import './Carousel.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({media_type,id}) => {
  const responsive = {
        0 : {
            items : 3,
        },
        512 : {
            items : 5,
        },
        1024 : {
            items : 7,
        },
  };
  const [cast,setCast] = useState([]);
  const items = 
  cast && cast.map(c => (
    <div className='castBlock'>
      
        <img
            className='castImage'
            src={c.profile_path ? `https://image.tmdb.org/t/p/w300${c.profile_path}` :  "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg" }
            onDragStart={handleDragStart}
        />
        <span className='castName'>{c ?.name}</span>
    </div>
  ));
  const fetchCast =async() => {
    const {data}  = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    setCast(data.cast);
}
  useEffect(() => {
    fetchCast();
  },[]);
  return (
    <AliceCarousel  disableDotsControls disableButtonsControls infinite autoPlay responsive={responsive} mouseTracking items={items} />
  );
};

export default Carousel;