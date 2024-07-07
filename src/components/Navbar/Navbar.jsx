import React, { useContext, useEffect, useState } from 'react'
import {AppBar,Button,Avatar,Toolbar,IconButton,useMediaQuery,useTheme,Box,Drawer} from '@mui/material'
import { ColorModeContext } from '../../theme';
import DarkLightModeToggler from './DarkLightModeToggler';
import { AccountCircle, Menu } from '@mui/icons-material';
import {useDispatch,useSelector} from 'react-redux'

import Img1 from '../../assets/17.jpg'
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Search from '../Search/Search';
import { fetchToken, getSessionId, movieAPI } from '../../Utils';
import { setUser, userSelector } from '../../Feature/auth';


const Navbar = () => {
    const dispatch = useDispatch()
    
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme()
    const isMobile = useMediaQuery("(max-width:37.5rem)")
    const [openDrawer,setOpenDrawer] = useState(false)
    const token = localStorage.getItem('token');
    const session = localStorage.getItem('session');
    const {user,isAuthenticated} = useSelector(state => state.user)


    console.log(user)
  return (
    <>
    <AppBar sx={{width:"100%",
    boxSizing:"border-box",
[theme.breakpoints.down('sm')]:{
    marginLeft:0,
    marginBottom:"2rem",
    width:"100%",
}
}}>
        <Toolbar sx={{
            display:"flex",justifyContent:"space-between",
            ml:"15rem",height:"5rem",outline:"none",
           width:"100%",flexWrap:"wrap",
                    [theme.breakpoints.down('sm')]:{
                        ml:'0rem',
                        flexWrap:"wrap",
                        maxWidth:"100% !important",
                        height:"6rem"
                    }}}>
            {isMobile && (
                <IconButton
                color='inherit'
                edge='start'
                onClick={() => setOpenDrawer(true)}
                >
                    <Menu sx={{
                        [theme.breakpoints.up('sm')]:{
                            display:"none"
                        }
                    }} />
                </IconButton>
            )}
            <DarkLightModeToggler />
            {!isMobile && <Search />}
            {!isAuthenticated ? (
            <Button color="inherit" onClick = {fetchToken}>
                Login &nbsp; <AccountCircle />
            </Button>
        ) :(
            <Button color='inherit' component={Link} 
            to='/profile/123'
            sx={{
                "&:hover":{
                    color:'white !important',
                    textDecoration:"none"
                }
            }}
            >
                {!isMobile && <>
                My Movies &nbsp;&nbsp;&nbsp;
                </>}
                <Avatar sx={{height:'30',width:'30'}} src={Img1}/>
            </Button>
        )}
      {isMobile && <Search />}
        </Toolbar>
    </AppBar>
    <div>
        <Box>
           {
            isMobile ? (
                <Drawer  
                variant='temporary'
                open={openDrawer}
                anchor='right'
                ModalProps={{keepMounted:true}}
                onClose={() => setOpenDrawer(prev => !prev)}
                sx={{

                    '.MuiPaper-root':{
                        width:"15rem"
                    },
                    [theme.breakpoints.down('sm')]:{
                        width:"15rem",
                        flexShrink:0,
                    }

                }}
                >
                    
                    <Sidebar setOpenDrawer={setOpenDrawer} />
                </Drawer>
            ) :(
                <Drawer 
                variant='permanent'
                open={true}
                sx={{

                    '.MuiPaper-root':{
                        width:"15rem"
                    },
                    [theme.breakpoints.down('sm')]:{
                        width:"15rem",
                        flexShrink:0,
                    }

                }}
                >
                 <Sidebar setOpenDrawer={setOpenDrawer} />

                </Drawer>
            )
           }
        </Box>
    </div>
    </>
  )
}

export default Navbar