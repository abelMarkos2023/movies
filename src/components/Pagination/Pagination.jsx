import React from 'react'
import {Box,Button,Typography} from '@mui/material'
const Pagination = ({page,setPage,total}) => {

    const currentPage = 2;
    const handlePrev = () => {
        if(page > 1){
            setPage(p => page - 1)
        }

        
    }
    const handleNext = () => {
        if(page < total ){
            setPage(p => page + 1)

        }

    }
  return (
   
    <Box sx={{
        width:"100%",
        display:'flex',
       gap:".8rem",
        alignItems:'center',
        justifyContent:"center",
        marginTop:"2rem",
        flexWrap:'wrap',
        padding:'10px'
    }}>
        <Button onClick={handlePrev} variant="contained" color="primary">
          Previous
        </Button>
        {/* {
            Array.from(Array(total).keys()).map((i) => (
                <Button onClick={() => setPage(i+1)} sx={{fontSize:"1.2rem", color:page === (i+1) && 'orange'}} key={i} variant="contained" color="primary">
                    {i+1}
                </Button>
            ))
        } */}
        <Typography variant='h4'>{page}</Typography>
        <Button onClick={handleNext} variant="contained" color="primary">
          Next
        </Button>
    </Box>
  )
}

export default Pagination