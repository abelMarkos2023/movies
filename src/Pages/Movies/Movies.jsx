import React,{useState} from 'react'
import {Box,CircularProgress,useMediaQuery,Typography} from '@mui/material'
import { selectGenreOrCategory } from '../../Feature/currentGenreOrCategory';

import {useSelector} from 'react-redux';
import { useGetMoviesQuery } from '../../Services/TMDB';
import MovieList from '../../components/MovieList/MovieList';
const Movies = () => {

  const [page, setPage] = useState(1)  

  const handlePage = p => {
    setPage(p)
  }
  const {genreOrCategoryName,searchQuery} = useSelector(state => state.currentGenreOrCategory);
  const {data,isLoading,errors} = useGetMoviesQuery({genreIdOrCategoryName:genreOrCategoryName,page,searchQuery});

  if(isLoading){
    return (
      <Box sx={{
        display:"flex",
        justifyContent:"center",
      }}>
      <CircularProgress width={'15rem'} />
      </Box>
    )
  }
 
  return (
    <div>
      {data && <MovieList movies={data} page={page} setPageNumber = {handlePage}/>}
    </div>
  )
}

export default Movies