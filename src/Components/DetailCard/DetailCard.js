import React , {useState , useEffect } from 'react';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Carousel from '../Carousel/Carousel.js';
import './DetailCard.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height:'75%',
  borderRadius:5,
  bgcolor: '#000000',
  border: '1px solid rgba(99,99,99,0.7)',
  color:'white',
  boxShadow: 24,
  p: 3,
};

export default function DetailCard({ children, mediaType, id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [detail,setDetail] = useState();
  const [ytvideo,setYTVideo] = useState();
 
  const fetchInfo = async() => {
    try{    
      const {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      setDetail(data);
    }
    catch(e){
      console.log(e);
    }

  };
  const fetchVideo = async() => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    setYTVideo(data.results[0]?.key);
    };
    useEffect(()=>{
    fetchInfo();
    fetchVideo();
    // eslint-disable-next-line
    },[id]);


  return (
    <>
      <div className='card' onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {detail && (
                    <div className='ContentModal'>
                        <img className='ContentModal_portrait' alt={detail.title || detail.name} src={detail.poster_path ? `https://image.tmdb.org/t/p/w500${detail.poster_path}`: "https://www.movienewz.com/img/films/poster-holder.jpg"} />
                        <img className='ContentModal_landscape' alt={detail.title || detail.name} src={detail.backdrop_path ? `https://image.tmdb.org/t/p/w500${detail.backdrop_path}`: "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg"} />
                        <div className='ContentModal_about'>
                          <span className='ContentModal_title'>
                            {detail.title || detail.name}
                          </span>
                          {detail.tagline && (<p className="tagline">{detail.tagline}</p>)}
                          <span className='ContentModal_description'>{detail.overview ? detail.overview : "We don't have an overview translated in English. " }</span> 
                          <div className='carouselBoundary'>
                              <Carousel media_type={mediaType} id={id}/>
                          </div>
                          {ytvideo && <Button
                          variant='outlined'
                          target='__blank'
                          href={`https://www.youtube.com/watch?v=${ytvideo}`}>
                              TRAILER
                          </Button>}
                        </div>
                    </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
