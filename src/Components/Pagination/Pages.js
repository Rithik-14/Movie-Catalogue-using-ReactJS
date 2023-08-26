import React from 'react'
import Pagination from '@mui/material/Pagination';
import './Pages.css';
import { createTheme , colors , ThemeProvider } from '@mui/material';

const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

const Pages = ({setPage,no_of_pages=10 }) => {
    
    function switchpage(page){
        setPage(page);
        window.scroll(0,0);
    }
  
    return (
    <div className='boxpage'> 
         <ThemeProvider theme={theme}>
            <Pagination hideNextButton hidePrevButton count={no_of_pages} variant="outlined" shape="rounded" onChange={(e) => switchpage(e.target.textContent)}/> 
         </ThemeProvider>
    </div>
  );
};

export default Pages;