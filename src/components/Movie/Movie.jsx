import React from 'react'
import {Box,Grid,Grow,Typography,Tooltip,Rating,useTheme,useMediaQuery} from '@mui/material'
import { Link } from 'react-router-dom'
const Movie = ({movie,i}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery("(max-width:37.5rem)")
    return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} p={'10px'} sx={{
        transition:"all 300ms ease-in-out",
        shadow:"0px 20px 30px rgba(255,255,255,0.6)",
        "&:hover":{
            transform:"scale(1.05)"
        }
    }}>
        <Grow in key={i} timeout={(i+1) * 1000}>
        <Box component={Link} to={`/movies/${movie.id}`} sx={{
            fontWeight:"bolder",
            textAlign:"center",
            width:"100%",
            textDecoration:"none",
        }}>
            {
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`:"https://www.fillmurray.com/200/300"} alt={movie.title} style={{height:'18rem',borderRadius:"1.2rem",marginBottom:".6rem",width:isMobile?"100%":'80%',objectFit:"cover"}}/>
            }
<Typography variant='h5' sx={{
        color:theme.palette.text.primary,
        width:"90%",
        overflow:'hidden',
        whiteSpace:"nowrap",
        mt:"1rem"
        }}>{movie.title}</Typography>
        <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
            <Rating readOnly value={movie.vote_average.toFixed(2) / 2} sx={{
            // color:theme.palette.text.primary,
            width:"90%",
            overflow:'hidden',
            whiteSpace:"nowrap",
            mt:"1rem"
        }} percision={0.1}/>
            </div>
        </Tooltip>
        
        </Box>
        </Grow>

        
       
        
    </Grid>
  )
}

export default Movie