import React, { useEffect,useState } from 'react'
import {Modal,Button,Typography,Rating,Box,useMediaQuery,Grid,ButtonGroup,CircularProgress,useTheme} from '@mui/material'
import {Movie as MovieIcon,Theaters,Language,PlusOne,Favorite,FavoriteBorderOutlined,Remove,ArrowBack} from "@mui/icons-material"
import {Link,useParams,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import MovieList from '../../components/MovieList/MovieList'
import { useGetMovieDetailsQuery, useGetMovieRecommendationsQuery } from '../../Services/TMDB'
import  Assets from '../../assets/genres';
import { selectGenreOrCategory } from '../../Feature/currentGenreOrCategory'

const MovieDetails = () => {

  const {id} = useParams()
  const {data,isLoading,error} = useGetMovieDetailsQuery(id);
  const {data:recommendation,isLoading:isLoading2,error:error2} = useGetMovieRecommendationsQuery({id,list:'recommendations'})
  console.log(recommendation)
  const isMobile = useMediaQuery("(max-width:37.5rem)")
  const isMedium= useMediaQuery("(max-width:56.5rem)")
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)

  const theme = useTheme()



  if(error){
    return (
      <Box sx={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"100vh",
        width:"100vw"
      }}>
        <Typography variant="h4" sx={{
          textAlign:"center",
          color:"red"
        }}>
          Error While Fetching Movie Information{console.log(error)}
        </Typography>
      </Box>
    )
    
  }
  if(isLoading){
    return (
      <Box sx={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"100vh",
        width:"100vw"
      }}>
        <CircularProgress width={'15rem'} />
      </Box>
    )
  }
  console.log(data)
  //const isMobile = useMediaQuery("(max-width: 37.5rem)")

  return (
   <Grid container sx={{
    display:"flex",
    justifyContent:"space-around",
    m:".8rem 0rem !important",
    [theme.breakpoints.down('sm')]:{
      flexDirection:"column",
      flexWrap:"wrap"
    }
   }}>
    <Grid item sm={12} lg={4}>
   <Box  component="img"
    src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} 
    alt="" 
    sx={{
      borderRadius:"1.24rem",
      width:"100%",
      boxShadow:"0px 1rem 1rem rgba(0,0,0,0.6)",
      [theme.breakpoints.down('md')]:{
        width:"80%",
        mt:"1rem"
      },
      [theme.breakpoints.down('sm')]:{
        width:"100% !important",
        height:"22rem",
        m:"1rem auto",
        marginBottom:"2rem"
      },
      
    }}
    />
    </Grid>
    <Grid item container direction='column' lg={7}>
      <Typography variant='h3' gutterBottom align='center'>
        {
          data?.title
        }
        &nbsp;
        ({
          data?.release_date.split("-")[0]
        })
      </Typography>
      <Typography variant='h5' gutterBottom align='center'>
        {
          data?.tagline
        }
       
      </Typography>
      <Grid item >
       <Grid item sx={{display:"flex",alignItems:"center",justifyContent:"space-between",m:".8rem 0rem !important",
    [theme.breakpoints.down('sm')]:{
      flexDirection:"column",
      flexWrap:"wrap"
    }}}>
       <Box display='flex' align='center' justifyContent='space-between'>
          <Rating readOnly value={data?.vote_average / 2} />
          <Typography variant="subtitle1" gutterBottom sx={{ml:"1rem"}}>
            {
              data?.vote_average.toFixed(1)
            } / 10
          </Typography>
          
        </Box>
        <Typography align='center' variant='h6' gutterBottom>
          {
            data?.runtime
          }-min {data?.spoken_languages.length > 0 && ` / ${data?.spoken_languages[0].name}`}
        </Typography>
       </Grid>
        <Grid item sx={{
          mt:".8rem 0 !important",
          display:"flex",
          justifyContent:"space-around",
          flexWrap:"wrap"
        }}>
          {
            data?.genres?.map((genre,index) => (
              <Link key={genre.id} to='/' onClick={() => {
                dispatch(selectGenreOrCategory(genre?.id))
                // navigate('/')
              }} style={{
                display:"flex",
                alignItems:"center",
                gap:"1rem",
                justifyContent:"center",
                textDecoration:"none",
                color:"inherit",
                mr:"1rem",
                padding:isMobile && ".5rem 1rem"
              }}>
              <Box component='img' src={Assets[genre.name.toLowerCase()]}  sx={{
              filter:theme.palette.mode === 'dark'?'invert(1)':'dark',
              width:"3rem",
              
            }}/> 
            <Typography variant='subtitle1'>{genre?.name}</Typography>            
      </Link>
            ))
          }
        </Grid>
        <Typography gutterBottom sx={{mt:".8rem"}} variant='h5'>
          Overview
        </Typography>
        <Typography gutterBottom sx={{mb:"2rem"}}>
          {
            data?.overview
          }
        </Typography>
        <Typography gutterBottom sx={{mt:".8rem"}} variant='h5'>
          Top Cast
        </Typography>
        <Grid item container sx={{
          display:"flex",
          gap:"1.2rem",
          flexWrap:"wrap"
        }}>
          {
            data?.credits?.cast?.filter(cast => cast.profile_path).slice(0,data.credits.cast.length / 4).map((cast,index) => (
          <Grid key={cast.id} sx={{textDecoration:"none",display:"flex",alignItems:"flex-start",gap:".6rem",flexDirection:"column"}} item  component={Link} to={`/actors/${cast.id}`}>
            <Box component='img' sx={{
              width:"9rem",
              height:"12rem",
              borderRadius:"10%",
              objectFit:"cover"
            }} src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`} alt="" />
            
           <Typography component={Link} to={`/actors/${cast.id}`} color="textPrimary">{cast.name.split('').slice(0,12)}</Typography>
           <Typography color="textSecondary">{cast.character.split('/')[0].split('').slice(0,12)}</Typography>
        </Grid> ))
          }
        </Grid>
        <Grid item container sx={{mt:'.8rem'}}>
          <div>
            <Grid item xs={12} sm={6}>
              <ButtonGroup size="medium" variant='outlined'>
                <Button target="_blank" rel="noopener noreferrer" component={Link} to={data?.homepage} endIcon={<Language />}>Website
                </Button>
                <Button target="_blank" rel="noopener noreferrer" component={Link} to={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>
                  IMDB
                </Button>
                <Button onClick={() => {setOpen(true)}} endIcon={<Theaters />}>Trailer</Button>
                <Button component={Link} sx={{}} endIcon={<ArrowBack />} to='/'>Back</Button>
              </ButtonGroup>
            </Grid>
           
          </div>
        </Grid>
      </Grid>
      
    </Grid>
    <Box sx={{mt:"5rem",width:"100%"}}>
    <Typography align='center' gutterBottom variant='h3'>
      You might also like
    </Typography>
    {
      recommendation ? <MovieList movies={recommendation}/>
:<Box>
Sorry There were no movie found
</Box> 
   }
  </Box>

  <Modal 
  closeAfterTransition
  open={open}
  onClose={()=>setOpen(open => !open)}
  sx={{
    display:"flex",
    justifyContent:'center',
    alignItems:"center"
  }}
  >
{
  data?.videos?.results?.length > 0 && (
    <iframe
    
    style={{
      width:isMobile?"90%":"50%",
      height:isMobile?"90%":"50%",
      
    }}
    autoPlay
    frameBorder="0"
    title='Trailer'
    src={`https://www.youtube.com/embed/${data.videos.results[0].key }`}
    allow="autoplay"
    />
  )
}
  </Modal>
   </Grid>
  )
}

export default MovieDetails