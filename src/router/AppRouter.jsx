import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages";
import { CalendarioPage } from "../calendario/pages";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";


const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    
    useEffect(() => {   // Se ejecuta una sola vez al montar el componente
        checkAuthToken();
    }, []);

    if ( status === 'checking' ) {
        return (
            // spinner

            <div className="d-flex flex-column g-2 justify-content-center align-items-center text-primary" style={{ height: '100vh' }}>
                <div className="spinner-border p-5 fs-1" role="status"></div>
                <strong className="text-dark">Cargando...</strong>
            </div>
        )
    };







    return (
        <Routes>
            {
                ( status === 'no-autenticado' ) 
                ? (
                    <>
                        <Route path="/auth/*" element={ <LoginPage />} />
                        <Route path="/*" element={ <Navigate to="/auth/login" />} />    {/* Si no se encuentra la ruta, redirecciona a esta */}
                    </>
                )
                : (
                    <>
                        <Route path="/" element={ <CalendarioPage />} />
                        <Route path="/*" element={ <Navigate to="/" />} />  {/* Si no se encuentra la ruta, redirecciona a esta */}
                    </>
                ) 
            }
        </Routes>
    )
}

export default AppRouter;