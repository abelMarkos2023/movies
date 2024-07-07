import React from "react";
import { useParams ,Link } from "react-router-dom";
import { useGetActorDetailQuery, useGetActorMoviesQuery } from "../../Services/TMDB";
import { Box, Grid, Typography, useTheme,Button } from "@mui/material";
import MovieList from "../../components/MovieList/MovieList";
const Actors = () => {
  const { id } = useParams();
  //const history = useHistory()
  const { data, isLoading, error } = useGetActorDetailQuery(id);
  const {data:featured,isLoading:isLosding2,error:error2} = useGetActorMoviesQuery(id)
  const theme = useTheme();
  const movies = {
    results:featured?.cast
  }
  
  return data?.name ? (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          m: ".8rem 0rem !important",
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            flexWrap: "wrap",
          },
        }}
      >
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
            sx={{
              width: "100%",
              height: "30rem",
              objectFit: "cover",
              borderRadius: "2rem",
              boxShadow: "0px 4px 8px rgba(0,0,0,.6)",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "3rem",
              }}
              gutterBottom
            >
              {data?.name}
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontSize: "2rem",
              }}
              gutterBottom
            >
              {new Date(data?.birthday).toDateString()}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: "1.2rem",
              }}
              gutterBottom
            >
              {data?.place_of_birth}
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: "1.1rem",
                mt: "1rem",
              }}
              gutterBottom
            >
              {data?.biography.split('').slice(0,200)}
            </Typography>
            <Button to={`https://www.imdb.com/name/${data.imdb_id}`} variant="outlined" target="_blank" color="primary" sx={{
              mt:"1rem"
            }} component={Link}>
              IMDB
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{mt:"5rem",width:"100%"}}>
    <Typography align='center' gutterBottom variant='h3'>
      Movies Featured By {data?.name}
    </Typography>
    {
      featured?.cast?.length > 0 ? <MovieList movies={movies}/>
:(<Box>
Sorry There were no movie found
</Box> )
}
    </Box>
    </Box>
) : (
    <Box>No Data Yet</Box>
    
  );
};

export default Actors;
