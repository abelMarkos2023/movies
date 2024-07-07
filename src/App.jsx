import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import './App.css'
import {CssBaseline,ThemeProvider,Box} from '@mui/material'
import {Route,Routes} from 'react-router-dom'
import Movies from './Pages/Movies/Movies'
import MovieDetails from './Pages/MovieDetails/MovieDetails'
import Actors from './Pages/Actors/Actors'
import Profile from './Pages/Profile/Profile'
import Navbar from './components/Navbar/Navbar'
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>

    <div className='root'>

      <CssBaseline />
      <Navbar />
      <Box className='content' sx={{
        width:"100% !important",
        p:"2rem",
        ml:"15rem",
        '.MuiPaper-root':{
          maxWidth:"100vw"
        },
        [theme.breakpoints.down('sm')]:{
          ml:"0rem",
          mt:"2rem",
          p:"1rem"
        }
      }}>
        <div className='toolbar' />
      <Routes>
        <Route path = '/' element={<Movies />} />
        <Route path = '/movies/:id' element={<MovieDetails />} />
        <Route path = '/actors/:id' element={<Actors />} />
        <Route path = '/profile/:id' element={<Profile />} />
      </Routes>
      </Box>
      
    </div>
    </ThemeProvider>

    </ColorModeContext.Provider>

  )
}

export default App
