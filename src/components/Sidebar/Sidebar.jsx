import React,{useState,useEffect} from 'react'
import {Divider,Box,List,ListItem,ListItemText,ListItemIcon,CircularProgress,ListSubheader,useTheme} from '@mui/material'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

import { useGetGenresQuery } from '../../Services/TMDB';
import  Assets from '../../assets/genres';
import { selectGenreOrCategory } from '../../Feature/currentGenreOrCategory';
const Sidebar = ({setOpenDrawer}) => {
  const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const {data,error} = useGetGenresQuery();
const [genres, setGenres] = useState([])


useEffect(() => {
  setGenres(data?.genres)

  return () => {
    
  }
}, [data])

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },]
const theme = useTheme()

const dispatch = useDispatch();
const {genreOrCategoryName} = useSelector(state => state.currentGenreOrCategory);

  return (
   <>
   <Link to='/' style={{
    display:"flex",
    justifyContent:"center",
    padding:"5% 0",
   }}>
    <img src={theme.palette.mode == 'dark'? blueLogo : redLogo} style={{
      width:"70%"
    }} />
   </Link>
   <Divider />
   <List>
   <ListSubheader>Categories</ListSubheader>
   {
    categories.map(({value,label}) => (
      <Link  key={value} style={{
        color:theme.palette.text.primary,
        textDecoration:"none"
      }}>
        <ListItem onClick={() => {
          dispatch(selectGenreOrCategory(value))  
                    setOpenDrawer(false)

        }} button>
          <ListItemIcon>
            <img src={Assets[value]} height='40' style={{
              filter:theme.palette.mode === 'dark'?'invert(1)':'dark'
            }}/>
          </ListItemIcon>
          <ListItemText primary={label}/>
        </ListItem>
      </Link>
    ))
   }
   </List>

   <Divider />

   <List>
   <ListSubheader>Genres</ListSubheader>
   {
    genres?.map(({id,name}) => (
      <Link to='/'  key={id} style={{
        color:theme.palette.text.primary,
        textDecoration:"none"
      }}>
        <ListItem onClick={() => {
          dispatch(selectGenreOrCategory(id))
          setOpenDrawer(false)
        }
          } button>
          <ListItemIcon color={theme.palette.mode === 'dark'?'white':"blaack"}>
            <img src={Assets[name.toLocaleLowerCase()]} height='40' style={{
              color:"inherit",
              filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'dark',
            }}/>
          </ListItemIcon>
          <ListItemText primary={name}/>
        </ListItem>
      </Link>
    ))
   }
   </List>
   </>
  )
}

export default Sidebar