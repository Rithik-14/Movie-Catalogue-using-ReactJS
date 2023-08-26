import React , { useState , useEffect } from 'react'
import './Search.css';
import Card from "../../Components/Card/Card.js";
import Pages from "../../Components/Pagination/Pages.js";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme , colors , ThemeProvider } from '@mui/material';
import axios from 'axios';

function Search() {

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary:{
    main: "#ffffff",
    },
  },
});
const [page,setPage] = useState(1);
const [type,setType] = useState(0);
const [searchContent,setSearchContent] = useState([]);
const [searchQuery,setQuery] = useState("");
const [noofpages,setnoofpages] = useState();


const searchapi = async () => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`
    );
    
    setSearchContent(data.results);
    setnoofpages(data.total_pages);
  } catch (e) {
    console.error(e);
  }
};
useEffect(() => {
  window.scroll(0,0);
  searchapi();
},[type,page]);



return (
<div>
<span className='navtitle'>SEARCH</span>

<ThemeProvider theme={theme}>
      <div className='searchbar'>
        <div className='sideTab'>
            <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            style={{ paddingBottom: 5 }}
            onChange={(event, updatedType) => {
            setType(updatedType);
            setPage(1);
            }}
            >
              <Tab style={{ width: "50%" }} label="Movies" />
              <Tab style={{ width: "50%" }} label="TV" />
            </Tabs>
        </div>
        <TextField onChange={(ele) => setQuery(ele.target.value)} style={{width:'100%'}} label="Search" variant="outlined" />
        <Button onClick={searchapi} style={{marginLeft:'5px',height:'54px'}}variant='outlined'><SearchIcon fontSize="large" /></Button>
      </div>

      <div className='bottomTab'>
        <Tabs
        value={type}
        indicatorColor="primary"
        textColor="primary"
        style={{ paddingBottom: 5 }}
        onChange={(event, updatedType) => {
        setType(updatedType);
        setPage(1);
        }}
        >
          <Tab style={{ width: "50%" }} label="Movies" />
          <Tab style={{ width: "50%" }} label="TV" />
        </Tabs>
      </div>
</ThemeProvider>

<div className='srch'>
    {
    searchContent && searchContent.map( (s) => (
    <Card
    id={s.id}
    desc={s.overview ? (s.overview.length <= 135) ? s.overview : s.overview.slice(0,135)+"..." : "We don't have an overview translated in English. "}
    poster={s.poster_path}
    title={s.title || s.name}
    year={s.release_date ? s.release_date.slice(0,4) : ""}
    rating={s.vote_average ? "⭐"+s.vote_average : "⭐--"}
    media={type ? "tv" : "movie"}
    />
    ))
    }
</div>
  {
    noofpages > 1 &&
    (<Pages setPage={setPage} no_of_pages={(noofpages <= 500) ? noofpages : 500} />)
  }
  </div>
);
};

export default Search;
