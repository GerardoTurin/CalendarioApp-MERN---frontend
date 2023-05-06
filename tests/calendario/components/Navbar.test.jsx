import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../../../src/calendario/components/Navbar";
import { Provider } from "react-redux";
import { store } from "../../../src/store";


describe('Pruebas en Navbar.jsx', () => {

    const onChangeLenguaje = jest.fn();
    const lenguaje = jest.fn();
    
    beforeEach(() => {
        jest.clearAllMocks(),
        jest.clearAllTimers();
    });
    
    test('Debe de cambiar el lenguaje al hacer click en el botón', () => {
        

        render( 
            <Provider store={ store }>
                <Navbar onChangeLenguaje={ onChangeLenguaje } lenguaje={ lenguaje } /> 
            </Provider>
        );
        const btn = screen.getByLabelText('cambioIdioma');
        
        fireEvent.click( btn );

        // el boton debe de tener el texto 'Cambiar a Español', eliminar espacio en blanco
        expect( btn.textContent.trim() ).toBe('Change to English');
    });
});