import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";



const useUiStore = () => {
    
    const dispatch = useDispatch(); //^ Aquí se obtiene el dispatch de la store, para poder ejecutar acciones en la misma.
    const { isDateModalOpen,  } = useSelector(state => state.ui); //^ Aquí se obtiene el estado de la store, en este caso el estado de la ui.

    //^ Aquí se definen los métodos que se van a utilizar en el componente.

    const openModal = () => {
        dispatch( onOpenDateModal() );
    };

    const closeModal = () => {
        dispatch( onCloseDateModal() );
    };


    // toogleModal
    /* const toogleModal = () => {
        ( isDateModalOpen ) 
            ? dispatch( onCloseDateModal() ) 
            : dispatch( onOpenDateModal() );
    }; */


    return {

        // Propiedades
        isDateModalOpen,

        // Métodos
        openModal,
        closeModal,
        //toogleModal,
    };
};


export default useUiStore;