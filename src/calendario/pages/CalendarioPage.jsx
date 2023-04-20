import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BotonAddNew, BotonDelete, EventoCalendario, ModalCalendario, Navbar } from "../components";
import { localizer, getMensajesES, getMensajesEN } from '../../helpers';
import useCalendarioPage from '../hooks/useCalendarioPage';
//import { useCalendarioStore } from '../../hooks';
//import { useEffect } from 'react';





const CalendarioPage = () => {

    //const { startLoadingEventos } = useCalendarioStore();

    const { events, lastView, lenguaje, onCambiarView, onDobleClick, onSelecEvento, eventStyleGetter, onChangeLenguaje } = useCalendarioPage();

    /* useEffect(() => {
        startLoadingEventos();
    }, []);   // Aqui se le indica que se ejecute cuando se monte el componente. */

    return (
        <>
            <Navbar onChangeLenguaje={() => onChangeLenguaje()} lenguaje={ lenguaje } />

            <Calendar
                culture={lenguaje ? 'es-ES' : 'en-US'}
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={lenguaje ? getMensajesES() : getMensajesEN()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: EventoCalendario
                }}
                onDoubleClickEvent={onDobleClick}
                onSelectEvent={onSelecEvento}
                onView={onCambiarView}
            />
            <ModalCalendario />
            <BotonAddNew />
            <BotonDelete />
        </>
    );
}

export default CalendarioPage;