import React, { useEffect, useState } from 'react'
import './Card.css';
import DetailCard from '../DetailCard/DetailCard.js';

const Card = ({id,desc,poster,title,year,rating,media}) => {

  return (
    <DetailCard mediaType={media} 
    id={id}
    >
        <img
            className="poster"
            src={poster ? `https://image.tmdb.org/t/p/w300${poster}` : "https://www.movienewz.com/img/films/poster-holder.jpg"}
            alt={title}
        />
        <div className='details'>
            <b className='title'>{title}</b>
            <div className='info'>
                {rating}
                <span className="date">{year}</span>
            </div>
            <div className='description'>
                {desc}
            </div>
        </div>
    </DetailCard>
  );
};

export default Card;