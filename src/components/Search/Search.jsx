import React,{ useState,useEfffect} from 'react'
import {TextField,InputAdornment,Box,useTheme} from '@mui/material'
import {Search as SearchIcon, TheaterComedyTwoTone} from '@mui/icons-material'
import {useLocation} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { searchMovie } from '../../Feature/currentGenreOrCategory';
const Search = () => {
    const handleChange = () => {
    if(e.key === 'Enter'){
        dispatch(searchMovie(query))
        setQuery('')
}
    }
    const theme =useTheme();
    const location = useLocation();
    console.log(location.pathname)
    const dispatch = useDispatch()
    const [query,setQuery] = useState('')
    if(location.pathname !== '/'){
        return null;

    }
  return (
    <Box sx={{
        [theme.breakpoints.down('sm')]:{
            display:"flex",
            justifyContent:"center",
            width:"100%"
        }
    }}>
        <TextField
         onKeyPress={handleChange} 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        label="Search"
        variant="standard"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            ),
        }}
        sx={{
            color:theme.palette.mode === 'light' && 'black',
            filter:theme.palette.mode === 'light' && 'invert(1)',
            [theme.breakpoints.down('sm')]:{
                marginTop:"-15px",
                marginBottom:"15px"
            }
        }}
        />
    </Box>
  )
}

export default Search