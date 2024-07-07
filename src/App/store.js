import {configureStore} from "@reduxjs/toolkit";
import { tmdbApi } from "../Services/TMDB";
import genreOrCategoryNameReducer  from "../Feature/currentGenreOrCategory";
import Userreducer from '../Feature/auth'
export default configureStore({
    reducer:{
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCategory:genreOrCategoryNameReducer,
        user:Userreducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),

})