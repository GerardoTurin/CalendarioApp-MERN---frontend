import { useCalendarioStore } from "../../hooks";

const BotonDelete = () => {

    const { startDeleteEvento, hasEventSelected } = useCalendarioStore();

    const deleteNota = () => {  //^ Aqui se debe eliminar desde la base de datos.
        startDeleteEvento();
    };


    return (
        <button 
            className="btn btn-danger fab-delete boton-delete-class" 
            onClick={ deleteNota }
            style={ { display: hasEventSelected ? '' : 'none' }}
        >
            <i className="fas fa-trash"></i>
        </button>
    )
}

export default BotonDelete;