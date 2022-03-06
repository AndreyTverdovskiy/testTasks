import axios from "axios";

const configOMDB = ({
    baseURL:' https://www.omdbapi.com'
});

const key = '8523cbb8';
const axiosInstance = axios.create(configOMDB);

const API = {
    searchFilmsByTitle : (title:string, page:number) => {
        return axiosInstance.get( '', {
            params: {
                s: title,
                apikey: key,
                page
            }
        })
    }
}

export default API
