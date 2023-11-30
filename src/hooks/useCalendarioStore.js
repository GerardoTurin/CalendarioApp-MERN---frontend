import { useDispatch, useSelector } from "react-redux";
import { onActivarEvento, onActualizarEvento, onAddNewEvento, onCargarEventos, onDeleteEvento } from "../store";
import calendarioApi from "../api/calendarioApi";
import { convertFechasToDate } from "../helpers";
import Swal from "sweetalert2";



const useCalendarioStore = () => {
    
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendario);
    const { user } = useSelector(state => state.auth);
    


    const onSetActivarEvento = (event) => {
        dispatch( onActivarEvento(event) );
    };



    const startGuardarEvento = async ( eventoCalendario ) => {
        
        try {
            if ( eventoCalendario.id ) {
                // Actualizar si hay id.
                await calendarioApi.put(`/events/${ eventoCalendario.id }`, eventoCalendario);
                dispatch( onActualizarEvento({ ...eventoCalendario, user }));
                return;
            }
    
            // Crear si no lo hay.
            const { data } = await calendarioApi.post("/events", eventoCalendario);
            dispatch( onAddNewEvento( {...eventoCalendario, id: data.eventoGuardado.id, user } ));   //^ Esto se remueve cuando se conecte con la base de datos.
            
        } catch (error) {
            console.log(error);

            Swal.fire('Error al intentar actualizar', error.response.data.msg, 'error');
        }

    };


    const startDeleteEvento = async () => {

        try {
            const { id } = activeEvent; 
            await calendarioApi.delete(`/events/${id}`);
            dispatch( onDeleteEvento() );
            
        } catch (error) {
            console.log(error);

            Swal.fire('Error al intentar eliminar', error.response.data.msg, 'error');
        }
    };



    const startLoadingEventos = async () => {
        try {
            const { data } = await calendarioApi.get("/events");
            const eventos = convertFechasToDate( data.eventos );

            dispatch( onCargarEventos( eventos ) );
        } catch (error) {
            console.log('Error al cargar los eventos.');
            console.log(error);
        }
    };

    return {
        
        //~ Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent?.id,   //^ Si existe el id del evento activo, entonces es true, sino es false.


        //~ Métodos
        onSetActivarEvento,
        startGuardarEvento,
        startDeleteEvento,
        startLoadingEventos,
    };
};

export default useCalendarioStore;