import { authSlice, checkLogin, onLogin, onLogout, clearError } from "../../../src/store/auth/authSlice.js";
import { autenticadoState, initialState } from "../../__fixtures/authStates.js";
import { testUserCredenciales } from "../../__fixtures/testUser.js";


describe('Pruebas en authSlice', () => {

    test('Debe regresar el estado inicial', () => {

        expect(authSlice.getInitialState()).toEqual( initialState );
    });


    test('Debe actualizar el estado a checking al llamar a checkLogin', () => {

        const state = authSlice.reducer( initialState, checkLogin() );
        expect(state).toEqual({ ...initialState, status: 'checking' });
    });


    test('Debe actualizar el estado a autenticado al llamar a onLogin', () => {

        const state = authSlice.reducer( initialState, onLogin(testUserCredenciales));

        expect(state).toEqual({ 
            status: 'autenticado', 
            user: testUserCredenciales,
            errorMenssage: null, });
    });



    test('Debe actualizar el estado a no-autenticado al llamar a onLogout', () => {

        const state = authSlice.reducer( autenticadoState, onLogout());

        expect(state).toEqual({ 
            status: 'no-autenticado', 
            user: {},
            errorMenssage: null, });
    });
    
    
    test('Debe mostrar un mensaje de error ( errormMenssage ) al llamar a onLogout', () => {

        const errorMenssage = 'Credenciales incorrectas';
        const state = authSlice.reducer( autenticadoState, onLogout(errorMenssage));

        expect(state).toEqual({ 
            status: 'no-autenticado', 
            user: {},
            errorMenssage: errorMenssage, });
    });


    test('Debe de limpiar el errorMenssage al llamar a clearError', () => {

        const errorMenssage = 'Credenciales incorrectas';
        const state = authSlice.reducer( autenticadoState, onLogout(errorMenssage));
        const newState = authSlice.reducer( state, clearError());

        expect(newState.errorMenssage).toBeNull();
    });


});

