import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';


const LoginFormFields = {
    loginEmail: '',
    loginPassword: '',
};


const RegisterFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
};




const LoginPage = () => {

    const { startLogin, startRegistro, errorMenssage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm( LoginFormFields );
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm( RegisterFormFields );

    const loginSubmit = (evt) => {
        evt.preventDefault();
        startLogin({ email:loginEmail, password:loginPassword });

        // Limpiar formulario

    };


    const registerSubmit = async (evt) => {
        evt.preventDefault();

        
        
        try {

            if ( registerName.trim().length < 2 ) {
                Swal.fire('Error', error.response.data.msg, 'error');
                return;
            };
    
    
            if ( registerPassword !== registerPassword2 ) {
                Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error');
                return;
            };
            
            await startRegistro({ email: registerEmail, password: registerPassword, name: registerName });
        } catch (error) {
            console.log(error);
            Swal.fire('Error', errorMenssage, 'error');
        }

    };



    useEffect(() => {
        if ( errorMenssage !== null ) {
            Swal.fire('Error de autenticacíon', errorMenssage, 'error');
            
        }
    }, [errorMenssage]);





    return (

        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name='registerPassword'
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='registerPassword2'
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" 
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
};

export default LoginPage;