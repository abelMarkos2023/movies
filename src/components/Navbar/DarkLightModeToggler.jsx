import React, { useContext } from 'react'
import {useTheme,IconButton,Button,Avatar,useMediaQuery,} from '@mui/material'
import { DarkModeOutlined, ExpandMore, Facebook, Instagram, LightModeOutlined,Menu, AccountCircle } from "@mui/icons-material";
import { ColorModeContext } from '../../theme';
const DarkLightModeToggler = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    console.log(theme.palette.mode)
   const isMobile = useMediaQuery('(max-width:37.5rem)');
  return (
    <div>
    {theme.palette.mode === "light" ? (
      <IconButton
        onClick={() => {
          localStorage.setItem(
            "mode",
            theme.palette.mode === "dark" ? "light" : "dark"
          );
          colorMode.toggleColorMode();
        }}
        color="inherit"
      >
        <LightModeOutlined fontSize="small" sx={{color:'#FFF'}}/>
      </IconButton>
    ) : (
      <IconButton
        onClick={() => {
          localStorage.setItem(
            "mode",
            theme.palette.mode === "dark" ? "light" : "dark"
          );
          colorMode.toggleColorMode();
        }}
        color="inherit"
      >
        <DarkModeOutlined fontSize="small"/>

        </IconButton>
    )}

  </div>
  )
}

export default DarkLightModeToggler