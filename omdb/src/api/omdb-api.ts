import axios from "axios";

const configOMDB = ({
    baseURL:' https://www.omdbapi.com'
});

const key = '8523cbb8';
const axiosInstance = axios.create(configOMDB);

const API = {
    searchFilmsByTitle : (title:string) => {
        const query = `?s=${title}&apikey=${key}`
        return axiosInstance.get(query)
    }
}

export default API