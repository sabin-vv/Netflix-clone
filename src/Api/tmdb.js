import axios, { Axios } from "axios"
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}` }
})
export default instance
