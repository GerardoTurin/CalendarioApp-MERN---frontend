

export const initialState = {
    status: 'no-autenticado', // checking, autenticado, no-autenticado
    user: {},
    errorMenssage: null,
};
export const autenticadoState = {
    status: 'autenticado', 
    user: {
        uid: '12345',
        name: 'Gera',
    },
    errorMenssage: null,
};
export const chekingState = {
    status: 'checking', 
    user: {},
    errorMenssage: null,
};


