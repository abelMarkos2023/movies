import React,{useState} from 'react'
import {Box,CircularProgress,useMediaQuery,Typography,Grid,useTheme} from '@mui/material'
import Movie from '../Movie/Movie'
import Pagination from '../Pagination/Pagination'

const MovieList= ({movies,page,setPageNumber}) => {
  const theme = useTheme()
  return (
    <Grid container sx={{
        display:'flex',
        justifyContent:'space-between',
        // gap:".6rem",
        flexWrap:'wrap',
        overflow:'auto',
        [theme.breakpoints.down('sm')]:{
            justifyContent:'center'
        }
    }}>
{
    movies && movies.results.map((movie,i) => <Movie key={movie.id} i={i} movie={movie}/>)
}
<Pagination page={page} setPage = {setPageNumber} total={movies.total_pages}/>
    </Grid>
  )
}

export default MovieList