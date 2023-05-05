import { createSlice } from '@reduxjs/toolkit';
//import { addHours } from 'date-fns';

/* const temporalEvents = {
    id: new Date().getTime(),
    title: 'Mi Cumpleaños',
    notes: 'Comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Gerardo'
    }
}; */

const initialState = {
    isLoadingEventos: true,
    events: [
        //temporalEvents
    ],
    activeEvent: null
};

export const calendarioSlice = createSlice({
    name: 'calendario',
    initialState,
    reducers: {
        onActivarEvento: ( state, { payload } ) => {
            state.activeEvent = payload;
        },
        onAddNewEvento: ( state, { payload } ) => {
            state.events.push( payload );
            state.activeEvent = null;   //^ Para ya no tener la nota activa.
        },
        onActualizarEvento: ( state, { payload } ) => {
            state.events = state.events.map( evt => {
                if ( evt.id === payload.id ) {
                    return payload;
                }
                return evt;
            });
        },
        onDeleteEvento: ( state ) => {

            if ( state.activeEvent ) {
                state.events = state.events.filter( evt => evt.id !== state.activeEvent.id );  //^ Se filtran todos los eventos, excepto el de la nota activa.
                state.activeEvent = null;   //^ Para ya no tener la nota activa.
            }
        },
        onCargarEventos: ( state, { payload = [] } ) => {
            state.isLoadingEventos = false;
            
            payload.forEach( evento => {

                const existeEvento = state.events.some( dbEvt => dbEvt.id === evento.id );

                if ( !existeEvento ) {
                    state.events.push( evento );
                }
            });
        },
        onLogoutCalendario: ( state ) => {
            state.isLoadingEventos = true;
            state.events = [];
            state.activeEvent = null;
        }
    }
});

export const { onActivarEvento, onAddNewEvento, onActualizarEvento, onDeleteEvento, onCargarEventos, onLogoutCalendario } = calendarioSlice.actions;