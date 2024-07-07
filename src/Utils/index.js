import axios from 'axios'

export const getMovies = async () => {
    const response = await axios.get(`${url}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`)
    return response.data.results
}

const apiKey = import.meta.env.VITE_API_KEY;
const url = 'https://api.themoviedb.org/3/'

export const movieAPI = axios.create({
    baseURL: url,
    params: {
        api_key: apiKey,
       
    }
})

export const fetchToken = async () => {

    try {
        const {data} = await movieAPI.get(`/authentication/token/new`)
    const token =  data.request_token 
    console.log(token)
    if(data.success){
        localStorage.setItem('token',token);
        window.location.href = `https://themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`
    }else{
        localStorage.removeItem('token')
    }
    } catch (error) {
        console.log(error)
    }
}

export const getSessionId = async () => {
    const token = localStorage.getItem('token')

    if(token){

       try {
        const {data} = await movieAPI.get(`authentication/session/new`,{request_token:token}
    )
    console.log(data)
        localStorage.setItem('session',data.session_id)
        return data.session_id
       } catch (error) {
        console.log(error)
       }
    }
   // const response = await mivieAPI.get('/authentication/sessin/new')
}