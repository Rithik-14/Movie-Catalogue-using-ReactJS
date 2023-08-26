import React , {useEffect} from 'react';
import { createTheme , colors ,ThemeProvider} from '@mui/material';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {useNavigate} from "react-router-dom";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFF45F',
        },
        secondary: {
            main: '#000000',
        },
    },
})

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
  useEffect(() => {
    if(value===0)navigate("/");
    else if(value === 1)navigate("/movies");
    else if(value === 2)navigate('/series');
    else if(value === 3)navigate('/search');
  },[value,navigate]);
  
  return (
    <Box sx={{width:'100%',position:'fixed',bottom:0,zIndex:100,}}>
        <ThemeProvider theme={theme}>
            <BottomNavigation sx={{bgcolor: 'secondary.main',}}
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            >
                <BottomNavigationAction style={{color: "white"}} label="Trending" icon={<WhatshotIcon />} />
                <BottomNavigationAction style={{color: "white"}} label="Movies" icon={<MovieIcon />} />
                <BottomNavigationAction style={{color: "white"}} label="TV Series" icon={<TvIcon />} />
                <BottomNavigationAction style={{color: "white"}} label="Search" icon={<SearchIcon />} />
            </BottomNavigation>
        </ThemeProvider>
    </Box>
    
  );
}