import { useEffect, useMemo, useState } from "react";


const useForm = ( initialForm = {}, formValidaciones = {} ) => {

    const [formState, setFormState] = useState( initialForm );
    const [formValidacion, setFormValidacion] = useState( {} );




    useEffect(() => {
        crearValidaciones();
    }, [formState]);


    // Si un objeto cambia, actualiza el estado del formulario.
    useEffect(() => {
        setFormState( initialForm );
    }, [initialForm]);



    const formValido = useMemo(() => {
        return Object.keys( formValidacion ).every( key => formValidacion[key] === null );  //^ Si todos los campos son null, el formulario es valido.

    }, [formValidacion]);



    // Hacer cambios en el input
    const onInputChange = ({ target }) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [name]: value
        })
    };


    const onResetForm = () => {
        setFormState( initialForm )
    };



    const crearValidaciones = () => {
        const checkValidaciones = {}

        for ( const formField of Object.keys( formValidaciones ) ) {
            const [ fnValidacion, errorMensaje ] = formValidaciones[formField];

            checkValidaciones[`${formField}Valido`] = fnValidacion( formState[formField] ) ? null : errorMensaje;
        }

        setFormValidacion( checkValidaciones );
    };




    return {
        ...formState,   //^ ...formState = name, email, password
        formState,
        onInputChange,
        onResetForm,

        ...formValidacion,
        formValido
    };
};

export default useForm;