import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Chip from '@mui/material/Chip';
import { createTheme,ThemeProvider } from '@mui/material';

const Genre = ({type,selected,remaining,setSelectedGenre,setRemainingGenre,setPage}) => {
    
    const theme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

    const genreapi = async() => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setRemainingGenre(data.genres);
    
    };


    useEffect(() => {
        genreapi();
        return () => {
            setRemainingGenre([]);//mount and unmount
        };
    },[]);

    const adder = (g) => {
        setSelectedGenre([...selected,g]);
        setRemainingGenre(remaining.filter( (ele) => ele.id !== g.id))
        setPage(1);
    }
    const remover = (g) => {
        setRemainingGenre([...remaining,g]);
        setSelectedGenre(selected.filter( (ele) => ele.id !== g.id))
        setPage(1);
    }
    return (
    <div style={{padding: '5px 0'}}>
        <ThemeProvider theme={theme}>
            {
                selected.map(genre => (
                <Chip
                style={{ margin: 2 }}
                label={genre.name}
                key={genre.id}
                color='primary'
                onDelete={() => remover(genre)}
                clickable
                size="small"
                />
                ))
            }
            {
                remaining.map(genre => (
                <Chip
                style={{ margin: 2 }}
                label={genre.name}
                key={genre.id}
                onClick={() => adder(genre)}
                clickable
                size="small"
                />
                ))
            }
        </ThemeProvider>
    </div>
  );
};

export default Genre;