import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const apiKey = import.meta.env.VITE_API_KEY;
// const url = 'https://api.themoviedb.org/3/movie/popular'
const url = 'https://api.themoviedb.org/3'
const page = 1
export const tmdbApi = createApi({
    reducerPath:"tmdbApi",
    baseQuery:fetchBaseQuery({ 
        baseUrl:url,
        // prepareHeaders: (headers, { getState }) => {
        //     headers.set('Content-Type', 'application/json')
        //     headers.set('X-API-KEY', HBO_KEY)
        //     headers.set('Authorization',`Bearer ${apiKey}`)
        //     return headers
        //   },
          }),
    endpoints: (builder) => ({

        //get Genres
        getGenres : builder.query({
            query: () => ({
                url:`/genre/movie/list?api_key=${apiKey}&page=${page}`,
                method:"Get"
            })
        }), 
        getMovies: builder.query({
            query: ({genreIdOrCategoryName,page,searchQuery}) => {

                if(searchQuery){
                    return {
                        url: `/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`, 
                        method: 'GET',
                    }
                }
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string'){
                    return {
                        url: `movie/${genreIdOrCategoryName}?api_key=${apiKey}&with_genres=${genreIdOrCategoryName}&page=${page}`, 
                        method: 'GET',
                    }
                }
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number'){
                    return {
                        url: `/discover/movie?api_key=${apiKey}&with_genres=${genreIdOrCategoryName}&page=${page}`, 
                        method: 'GET',
                    }
                }

                return {
                    url: `/movie/popular?api_key=${apiKey}&page=${page}`, 
                    method: 'GET',
               
            }
            }
            
            
    }),
        getMovieRecommendations: builder.query({
            query: ({id,list}) => ({
                url: `/movie/${id}/${list}?api_key=${apiKey}`,
                method: 'GET',
            }),
        }),
        getActorDetail: builder.query({
            query: (id) => ({
                url: `/person/${id}?api_key=${apiKey}`,
                method: 'GET',
            }),
        }),
        getActorMovies: builder.query({
            query: (id) => ({
                url: `person/${id}/combined_credits?api_key=${apiKey}`,
                method: 'GET',
            }),
        }),
        getNowPlayingMovies: builder.query({
            query: () => ({
                url: '/movie/now_playing',
                method: 'GET',
            }),
        }),
        getMovieDetails: builder.query({
            query: (id) => ({
                url: `/movie/${id}?append_to_response=videos,credits&api_key=${apiKey}`,
                method: 'GET',
            }),
        }),
    })

})

export const {useGetMoviesQuery,useGetActorMoviesQuery,useGetActorDetailQuery,useGetGenresQuery,useGetMovieDetailsQuery,useGetMovieRecommendationsQuery} = tmdbApi;

