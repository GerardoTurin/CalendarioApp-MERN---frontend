import { render, screen } from "@testing-library/react";
import { useAuthStore, useForm } from "../../src/hooks";
import AppRouter from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";
import { CalendarioPage } from "../../src/calendario/pages";

jest.mock('../../src/hooks');

jest.mock('../../src/calendario/pages', () => ({
    CalendarioPage: () => <h1>Calendario Page</h1>
}));


describe('Pruebas en AppRouter.jsx', () => {

    const mockCheckAuthToken = jest.fn();

    beforeEach(() => jest.clearAllMocks() );

    test('Debe de mostrar el spinner de carga y llamar a checkAuthToken', () => {


        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <AppRouter />
        );

        const spinner = screen.getByRole('status');

        expect( spinner ).toBeTruthy();
        expect( screen.getByText('Cargando...') ).toBeTruthy();
        expect( mockCheckAuthToken ).toHaveBeenCalled();
    });


    test('Debe de mostrar el componente LoginPage si no está autenticado', () => {

        useAuthStore.mockReturnValue({
            status: 'no-autenticado',
            errorMenssage: null,
            checkAuthToken: mockCheckAuthToken
        });

        useForm.mockReturnValue({
            loginEmail: '',
            loginPassword: '',
            onInputChange: jest.fn()
        });

        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        expect( screen.getByText('Ingreso') ).toBeTruthy();
        expect( container ).toMatchSnapshot();
    });



    test('Debe de mostrar el componente CalendarioPage si está autenticado', () => {

        useAuthStore.mockReturnValue({
            status: 'autenticado',
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        expect( screen.getByText('Calendario Page') ).toBeTruthy();
        
    });
});