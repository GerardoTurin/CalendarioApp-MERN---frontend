import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();


const calendarioApi = axios.create({
    baseURL: VITE_API_URL
});






//! Configuración de Interceptores...

calendarioApi.interceptors.request.use( ( config ) => {

    const token = localStorage.getItem("token");

    //^ Si existe un token en el localStorage, lo agregamos al header de la petición.
    if ( token ) {
        config.headers["x-token"] = token;
    };
    
    return config;

});



/* calendarioApi.interceptors.response.use( ( config ) => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem("token")
    }

    return config;
}); */



export default calendarioApi;