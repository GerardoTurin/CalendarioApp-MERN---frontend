import { useAuthStore } from "../../hooks";

const Navbar = ({ onChangeLenguaje, lenguaje }) => {

    const { startLogout, user } = useAuthStore();

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand">
                    <i className="fas fa-calendar-alt"></i>
                    &nbsp;
                    { user.name }
                </span>


                <button className="btn btn-outline-success" aria-label="cambioIdioma" onClick={ onChangeLenguaje }>
                    <i className="fas fa-language"></i>
                    &nbsp;
                    { 
                        !lenguaje ? 'Cambiar a Español' : 'Change to English'
                    }
                </button>


                
                <button className="btn btn-outline-danger" onClick={ startLogout }>
                    <i className="fas fa-sign-out-alt"></i>
                    &nbsp;
                    {
                        !lenguaje ? 'Salir' : 'Logout'
                    }
                </button>
            </div>
        </nav>
    )
};

export default Navbar;