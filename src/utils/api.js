import axios from 'axios';
const BASE_URL="https://api.themoviedb.org/3"
const TMDB_TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTU0Mjg3OWFiZjk0N2QwYTY2NDY4ZGRjMjY2MzUzYiIsInN1YiI6IjY0NTIzNGNiZDQ4Y2VlMDBmY2VkMjRiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8yGivX5M0mBVODM980tMEOxESsmadkOzkFlEqzYsgis";

const headers ={
    Authorization: 'bearer ' + TMDB_TOKEN,
};
export const fetchDataFromApi =async (url , params)=>{
    try {
        const {data} = await axios.get(BASE_URL + url ,{
            headers,
            params
        })
        return data; 
    } catch (err){
        console.log(err);
        return err;
    }
}