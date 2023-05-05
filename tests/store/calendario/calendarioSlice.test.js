import { calendarioSlice, onActivarEvento, onActualizarEvento, onAddNewEvento, onCargarEventos, onDeleteEvento, onLogoutCalendario } from "../../../src/store/calendario/calendarioSlice";
import { calendarioWithActiveEventState } from "../../__fixtures/calendarioState";
import { calendarioWithEventosState, eventos, initialState } from "../../__fixtures/calendarioState";



describe('Pruebas en calendarioSlice', () => {

    test('Debe de retornar el estado por defecto', () => {

        const state = calendarioSlice.getInitialState();
        expect(state).toEqual(initialState);
    });

    test('Debe de activar un evento al llamar a onActivarEvento', () => {

        const state = calendarioSlice.reducer( calendarioWithEventosState, onActivarEvento( eventos[0] ));
        expect(state.activeEvent).toEqual(eventos[0]);
    });



    test('Debe de agregar un nuevo evento al llamar a onAddNewEvento', () => {

        const newEvent = {
            id: '789',
            start: new Date('2021-09-03T12:00:00'),
            end: new Date('2021-09-03T14:00:00'),
            title: 'Feriado',
            notes: 'No se Trabaja',
        };

        const state = calendarioSlice.reducer( calendarioWithEventosState, onAddNewEvento( newEvent ));
        expect(state.events ).toEqual([...eventos, newEvent]);
    });



    test('Debe de actualizar un evento al llamar a onActualizarEvento', () => {

        const eventoActualizado = {
            id: '123',
            start: new Date('2021-09-04T13:00:00'),
            end: new Date('2021-09-04T16:00:00'),
            title: 'Dia Laboral ( Actualizacion )',
            notes: 'Se Trilla ( Actualizacion )',
        };

        const state = calendarioSlice.reducer( calendarioWithEventosState, onActualizarEvento( eventoActualizado ));
        expect(state.events ).toContain(eventoActualizado); // Se espera que el evento actualizado este en el arreglo de eventos.
    });



    test('Debe de eliminar un evento al llamar a onDeleteEvento', () => {

        const state = calendarioSlice.reducer( calendarioWithActiveEventState, onDeleteEvento());
        
        expect(state.activeEvent).toBeNull(); // Se espera que la nota activa sea null.
        expect(state.events ).not.toContain(eventos[0]); // Se espera que el evento eliminado no este en el arreglo de eventos.
    });




    test('Debe de mostrar los eventos al llamar a onCargarEventos', () => {

        const state = calendarioSlice.reducer( initialState, onCargarEventos( eventos ));
        
        expect(state.isLoadingEventos).toBeFalsy(); // Se espera que isLoadingEventos sea false.
        expect(state.events ).toEqual(eventos);


        const newState = calendarioSlice.reducer( state, onCargarEventos( eventos ));
        expect(state.events.length).toBe(eventos.length); // Se espera que el arreglo de eventos sea igual al arreglo de eventos.
    });




    test('Debe de volver al estado por defecto al llamar a onLogoutCalendario', () => {

        const state = calendarioSlice.reducer( calendarioWithActiveEventState, onLogoutCalendario());
        expect(state).toEqual(initialState); // Se espera que el evento eliminado no este en el arreglo de eventos.
    });
});