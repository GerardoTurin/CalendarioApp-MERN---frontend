import { useEffect, useState } from "react";
import { useAuthStore, useCalendarioStore, useUiStore } from "../../hooks";
import Swal from "sweetalert2";




const useCalendarioPage = () => {

    const { user } = useAuthStore();
    const { openModal } = useUiStore();
    let { events, onSetActivarEvento, hasEventSelected, startLoadingEventos } = useCalendarioStore();

    const [lenguaje, setLenguaje] = useState(localStorage.getItem('lenguaje') === 'es-ES' || false);    // Aqui se obtiene el lenguaje del localStorage.
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {
        localStorage.setItem('lenguaje', lenguaje ? 'es-ES' : 'en-US');   // Aqui se guarda el lenguaje en el localStorage.
    }, [lenguaje]); // Aqui se le indica que se ejecute cuando cambie el lenguaje.


    const onChangeLenguaje = () => {
        setLenguaje(!lenguaje);
    };



    const eventStyleGetter = (event, start, end, isSelected) => {

        const esMyEvento = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

        const style = {
            backgroundColor: esMyEvento ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: esMyEvento ? 1 : 0.8,
            color: 'white',
            pointerEvents: esMyEvento ? 'auto' : 'none'
        }

        

        return {
            style
        }
    };


    const onDobleClick = (evt) => {
        openModal()
    };

    const onSelecEvento = (evt) => {
        onSetActivarEvento(evt);

    };


    const onCambiarView = (evt) => {
        setLastView(evt);
        localStorage.setItem('lastView', evt);
    };


    const setHasEventSelected = (value) => {    
        hasEventSelected = value;   
    };



    const onDeseleccionarEvento = (evt) => {
        const deleteButton = evt.target.closest('.boton-delete-class');
        
        // Comprobar si es un clic dentro del evento o dentro del botón de eliminar
        if (!deleteButton) {
            onSetActivarEvento(null);
            setHasEventSelected(false); // Agrega esta línea
            return;
        }
    };


    const alertInfo = () => {
        // solo puedes modoficar o eliminar tus eventos
        Swal.fire({
            title: 'Solo puedes modificar o eliminar tus eventos',
            icon: 'info',
            timer: 2000,
            showConfirmButton: false
        })
    };



    useEffect(() => {
        startLoadingEventos();
        alertInfo();
    }, []);   // Aqui se le indica que se ejecute cuando se monte el componente.
    
    
    
    useEffect(() => {
        window.addEventListener("mousedown", onDeseleccionarEvento);
        
        return () => {
            window.removeEventListener("mousedown", onDeseleccionarEvento);
        };
    }, [onDeseleccionarEvento]);    // Aqui se le indica que se ejecute cuando cambie la función onDeseleccionarEvento.


    return {
        events,
        lenguaje,
        lastView,
        hasEventSelected,
        onChangeLenguaje,
        eventStyleGetter,
        onDobleClick,
        onSelecEvento,
        onCambiarView,
        setHasEventSelected,
        onDeseleccionarEvento,
    }
};



export default useCalendarioPage;
