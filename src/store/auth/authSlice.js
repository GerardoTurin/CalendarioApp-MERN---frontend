import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'no-autenticado', // checking, autenticado, no-autenticado
    user: {},
    errorMenssage: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkLogin: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMenssage = null;
        },
        onLogin: (state, { payload }) => {
            state.status = 'autenticado';
            state.user = payload;
            state.errorMenssage = null;
        },
        onLogout: (state, { payload }) => {
            state.status = 'no-autenticado';
            state.user = {};
            if ( payload ) {    //^ Si el payload existe, es porque se está llamando a la acción onLogout desde el catch de una petición http.
                state.errorMenssage = payload;
            };
        },
        clearError: (state) => {
            state.errorMenssage = null;
        }
    },
});

export const { checkLogin, onLogin, onLogout, clearError } = authSlice.actions;