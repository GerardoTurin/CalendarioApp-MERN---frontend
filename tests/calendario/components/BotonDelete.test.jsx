import { fireEvent, render, screen } from "@testing-library/react";
import BotonDelete from "../../../src/calendario/components/BotonDelete";
import { useCalendarioStore } from "../../../src/hooks";

jest.mock('../../../src/hooks');


describe('Pruebas en BotonDelete.jsx', () => {


    const mockStartDeleteEvento = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(),
        jest.clearAllTimers();
    });



    test('Debe de mostrar el componente correctamente', () => {

        useCalendarioStore.mockReturnValue({
            hasEventSelected: false
        });

        render(
            <BotonDelete />
        );
        
        const btn = screen.getByLabelText('btn-delete');

        expect( btn.classList ).toContain('btn');
        expect( btn.classList ).toContain('btn-danger');
        expect( btn.style.display ).toBe('none');
    });



    test('Debe de mostrar el boton si hay un evento activo', () => {

        useCalendarioStore.mockReturnValue({
            hasEventSelected: true
        });

        render(
            <BotonDelete />
        );
        
        const btn = screen.getByLabelText('btn-delete');
        expect( btn.style.display ).toBe('');
    });




    test('Debe de llamar la funcion startDeleteEvento, al hacer click', () => {

        useCalendarioStore.mockReturnValue({
            hasEventSelected: true,
            startDeleteEvento: mockStartDeleteEvento
        });

        render(
            <BotonDelete />
        );
        
        const btn = screen.getByLabelText('btn-delete');
        
        fireEvent.click( btn );
        expect( mockStartDeleteEvento ).toHaveBeenCalled(); // Se llama la funcion.
    });
});