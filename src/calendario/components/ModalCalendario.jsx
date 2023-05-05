import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import esES from 'date-fns/locale/es';
import enUS from 'date-fns/locale/en-US';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarioStore, useUiStore } from '../../hooks';
import { getEnvVariables } from '../../helpers';


registerLocale('es', esES);
registerLocale('en', enUS);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

if ( getEnvVariables().VITE_MODE !== 'test' ) {
    Modal.setAppElement('#root');
}





const ModalCalendario = () => {

    const { isDateModalOpen, closeModal } = useUiStore();
    const { activeEvent, startGuardarEvento, events } = useCalendarioStore();


    // traer lenguaje guardado en el localStorage.
    const language = localStorage.getItem('lenguaje') === 'es-ES' || false;

    //const [isModalOpen, setIsModalOpen] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)    // aqui se le agrega 2 horas a la fecha actual.
    });


    const titleClass = useMemo(() => {
        
        if ( !formSubmitted ) return '';
        return ( formValues.title.length > 0 ) ? '' : 'is-invalid';

    }, [ formValues.title, formSubmitted ]);




    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({...activeEvent});
        }

    }, [activeEvent]);  // Aqui se le indica que se ejecute cuando cambie el activeEvent.




    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,  // Aqui se copia el objeto formValues.
            [target.name]: target.value // Aqui se le asigna el valor del input al campo del objeto.
        });
    };


    const onCloseModal = () => {
        closeModal();
    };


    const onSubmitForm = async (evt) => {
        evt.preventDefault();
        setFormSubmitted(true);
        
        // Validar fecha y hora.
        const diferencia = differenceInSeconds(formValues.end, formValues.start);
        if (isNaN(diferencia) || diferencia <= 0) {

            Swal.fire(
                'Error', 
                language ? 'Las fechas deben ser correctas' : 'The dates must be correct',
                'error'
            );
            return;
        }

        if (formValues.title.length <= 0) return;

        // Guardar evento.
        await startGuardarEvento( formValues );   // Aqui se llama al dispatch para guardar el evento.

        // Cerrar el modal.
        onCloseModal();

        //Limpiar el errores
        setFormSubmitted(false);
    };
    
    



    return (
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <h1> { language ? 'Nuevo evento' : 'New event' } </h1>
            <hr />
            <form className="container" onSubmit={ onSubmitForm }>

                <div className="form-group mb-2">
                    <label>{ language ? 'Fecha y hora inicio' : 'Start date and time' }</label>
                    <DatePicker 
                        className="form-control" 
                        selected={ formValues.start } 
                        onChange={ (evt) => setFormValues({ ...formValues, start: evt }) }
                        dateFormat="dd/MM/yyyy h:mm aa"
                        showTimeSelect
                        locale={ language ? 'es' : 'en'}
                        timeCaption={ language ? 'Hora' : 'Time'}
                    />
                </div>

                <div className="form-group mb-2">
                    <label>{ language ? 'Fecha y hora fin' : 'End date and time' }</label>
                    <DatePicker 
                        minDate={ formValues.start }
                        className="form-control" 
                        selected={ formValues.end } 
                        onChange={ (evt) => setFormValues({ ...formValues, end: evt }) }
                        dateFormat="dd/MM/yyyy h:mm aa"
                        showTimeSelect
                        locale={ language ? 'es' : 'en'}
                        timeCaption={ language ? 'Hora' : 'Time'}
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>{ language ? 'Título y notas' : 'Title and notes' }</label>
                    <input
                        type="text"
                        className={ `form-control ${ titleClass }` }
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">{ language ? 'Una descripción corta' : 'A short description' }</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">{ language ? 'Información adicional' : 'Additional information' }</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> { language ? 'Guardar' : 'Save' } </span>
                </button>

            </form>
        </Modal>
    )
};

export default ModalCalendario;