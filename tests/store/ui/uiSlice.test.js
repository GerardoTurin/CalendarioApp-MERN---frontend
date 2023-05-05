import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";


describe('Pruebas en uiSlice', () => {
    
    test('Debe regresar el estado inicial', () => {

        expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false});
    });


    test('Debe cambiar el estado de isDateModalOpen a true y despues a false', () => {

        let state = uiSlice.getInitialState();
        
        state = uiSlice.reducer(state, onOpenDateModal());
        expect(state.isDateModalOpen).toBeTruthy();
        
        state = uiSlice.reducer(state, onCloseDateModal());
        expect(state.isDateModalOpen).toBeFalsy();
    });
});