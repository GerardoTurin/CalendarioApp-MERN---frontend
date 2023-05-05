import { act, renderHook, waitFor } from "@testing-library/react";
import useAuthStore from "../../src/hooks/useAuthStore";
import { Provider } from "react-redux";
import { authSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";
import { chekingState, initialState } from "../__fixtures/authStates";
import { testUserCredenciales } from "../__fixtures/testUser";
import calendarioApi from "../../src/api/calendarioApi";

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: {...initialState}
        }
    })
};



describe('Pruebas en useAuthStore', () => {

    beforeEach(() => {
        localStorage.clear();
    });


    test('Debe de retornar el estado inicial', () => {
        const mockStore = getMockStore({...initialState});

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });


        expect( result.current ).toEqual( {
            status: 'no-autenticado',
            user: {},
            errorMenssage: null,
            startLogin: expect.any(Function),
            startRegistro: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),
        });
    });



    test('startLogin debe de realizar el login correctamente', async () => {

        const mockStore = getMockStore({...initialState});

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { startLogin } = result.current;

        await act(async() => {
            await startLogin(testUserCredenciales);
        });

        const { status, user, errorMenssage } = result.current;

        expect({ status, user, errorMenssage }).toEqual({
            status: 'autenticado',
            user: { name: testUserCredenciales.name, uid: testUserCredenciales.uid },
            errorMenssage: null,
        });

        expect( localStorage.getItem('token') ).toEqual(expect.any(String));
        expect( localStorage.getItem('token-init-date') ).toEqual(expect.any(String));
    });




    test('startLogin debe de retornar un error al loguear', async () => {

        const mockStore = getMockStore({...initialState});

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { startLogin } = result.current;

        await act(async() => {
            await startLogin({ email: 'error@gmail.com', password: '123456' });
        });

        const { status, user, errorMenssage } = result.current;

        expect( localStorage.getItem('token') ).toBeNull();
        expect({ status, user, errorMenssage }).toEqual({
            status: 'no-autenticado',
            user: {},
            errorMenssage: expect.any(String),
        });

        //espera para...
        await waitFor(() => 
            expect( result.current.errorMenssage ).toBeNull()
        );
    });




    test('startRegistro debe crear un usuario correctamente', async () => {


        const newUser = {
            name: 'newTestUser',
            email: 'newTestUser@gmail.com',
            password: '123456'
        }

        const mockStore = getMockStore({...initialState});

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { startRegistro } = result.current;


        const spya = jest.spyOn( calendarioApi, 'post' ).mockReturnValue({
            data: {
                ok: true,
                uid: '123',
                name: newUser.name,
                token: '12sdad6464564'
            }

        });   

        await act(async() => {
            await startRegistro(newUser);
        });

        const { status, user, errorMenssage } = result.current;

        expect({ status, user, errorMenssage }).toEqual({
            status: 'autenticado',
            user: { name: newUser.name, uid: '123' },
            errorMenssage: null,
        });

        spya.mockRestore();
    });




    test('startRegistro debe retornar un error al crear un usuario', async () => {

        const mockStore = getMockStore({...initialState});

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });


        await act(async() => {
            await result.current.startRegistro(testUserCredenciales);
        });

        const { status, user, errorMenssage } = result.current;
        expect({ status, user, errorMenssage }).toEqual({
            status: 'no-autenticado',
            user: {},
            errorMenssage: expect.any(String),
        });
    });




    test('checkAuthToken debe fallar si no hay token', async () => {
            
            const mockStore = getMockStore({...chekingState});
    
            const { result } = renderHook(() => useAuthStore(), {
                wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
            });

            //console.log('token', localStorage.getItem('token'));
            await act(async() => {
                await result.current.checkAuthToken();
            });

            const { status, user, errorMenssage } = result.current;

            expect({ status, user, errorMenssage }).toEqual({
                status: 'no-autenticado',
                user: {},
                errorMenssage: null,
            });
    });




    test('checkAuthToken debe retornar un usuario si hay token', async () => {

        const { data } = await calendarioApi.post('/auth', testUserCredenciales);
        localStorage.setItem('token', data.token);

        const mockStore = getMockStore({...chekingState});
    
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async() => {
            await result.current.checkAuthToken();
        });

        const { status, user, errorMenssage } = result.current;
        
        expect({ status, user, errorMenssage }).toEqual({
            status: 'autenticado',
            user: { name: testUserCredenciales.name, uid: testUserCredenciales.uid },
            errorMenssage: null,
        });
    });


});
