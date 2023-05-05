import { act, renderHook } from "@testing-library/react";
import useUiStore from "../../src/hooks/useUiStore";
import { Provider } from "react-redux";
//import { store } from "../../src/store/store";
import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../../src/store/ui/uiSlice";


const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            // Aqui se agregan los reducers.
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: {...initialState}
        }
    })
};


describe('Pruebas en useUiStore', () => {

    test('Debe de retornar los valores por defecto', () => {
        const mockStore = getMockStore({ isDateModalOpen: false });

        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        } );

        expect( result.current ).toEqual({ 
            isDateModalOpen: false,
            openModal: expect.any(Function),
            closeModal: expect.any(Function),
            toogleModal: expect.any(Function),
        });
    });



    test('Al llamar openModal debe de cambiar el valor de isDateModalOpen a true', () => {

        const mockStore = getMockStore({ isDateModalOpen: false });

        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        } );

        const { openModal } = result.current;

        act( () => {
            openModal();
        });

        expect( result.current.isDateModalOpen ).toBeTruthy();
    });



    test('Al llamar closeModal debe de cambiar el valor de isDateModalOpen a false', () => {

        const mockStore = getMockStore({ isDateModalOpen: true });

        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        } );

        //const { closeModal } = result.current;

        act( () => {
            result.current.closeModal();
        });

        expect( result.current.isDateModalOpen ).toBeFalsy();
    });



    test('Al llamar toogleModal debe de cambiar el valor de isDateModalOpen a true si es false, o a false si es true', () => {

        const mockStore = getMockStore({ isDateModalOpen: false });

        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        } );

        const { toogleModal } = result.current;

        act( () => {
            toogleModal();
        });

        expect( result.current.isDateModalOpen ).toBeTruthy();

        act( () => {
            result.current.toogleModal();
        });

        expect( result.current.isDateModalOpen ).toBeFalsy();
    });
});