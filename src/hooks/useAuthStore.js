
//! useAuthStore: Tiene como objetivo realizar cualquier interacción con el Auth en nuestro store, como por ejemplo, el login, el logout, etc.

import { useDispatch, useSelector } from "react-redux";
import calendarioApi from "../api/calendarioApi";
import { checkLogin, clearError, onLogin, onLogout } from "../store/auth/authSlice";
import { onLogoutCalendario } from "../store";




const useAuthStore = () => {
    
    const { status, user, errorMenssage  } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    
    const startLogin = async ({ email, password }) => {
        dispatch( checkLogin() );   //^ Llamamos a la acción checkLogin para que cambie el status a 'checking'
        
        try {
            const { data } = await calendarioApi.post("/auth", { email, password });
            localStorage.setItem("token", data.token);  //^ Guardamos el token en el localStorage.
            localStorage.setItem("token-init-date", new Date().getTime());  //^ Guardamos la fecha en la que se guardó el token en el localStorage.
            
            dispatch( onLogin({ name: data.name, uid: data.uid }) );  //^ Llamamos a la acción onLogin para que cambie el status a 'autenticado' y guarde el usuario en el store.
            
        } catch (error) {
            dispatch( onLogout( 'Usuario o contraseña incorrectos' ) );
            
            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
            
        };
    };



    const startRegistro = async ({ name, email, password }) => {
        dispatch( checkLogin() );

        try {
            const { data } = await calendarioApi.post("/auth/registro", { name, email, password });
            localStorage.setItem("token", data.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            console.log(error);
            dispatch( onLogout( error.response.data?.msg || 'Error inesperado' ) ); //^ Si el error tiene un mensaje, lo mostramos, sino, mostramos un mensaje genérico.

            setTimeout(() => {
                dispatch( clearError() );
            }, 100);
        };
    };





    const checkAuthToken = async () => {
        const token = localStorage.getItem("token");

        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await calendarioApi.get("/auth/renew");
            localStorage.setItem("token", data.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        };
    };





    const startLogout = () => {

        localStorage.clear();
        dispatch( onLogoutCalendario() );
        dispatch( onLogout() );
    };




    return {

        //~ Propiedades
        status,
        user,
        errorMenssage,


        //~ Métodos
        startLogin,
        startRegistro,
        checkAuthToken,
        startLogout,
    }
};


export default useAuthStore;