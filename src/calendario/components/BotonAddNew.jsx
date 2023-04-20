import { addHours } from "date-fns";
import { useCalendarioStore, useUiStore } from "../../hooks";

const BotonAddNew = () => {


    const { openModal } = useUiStore();
    const { onSetActivarEvento } = useCalendarioStore();

    const handleClickNew = () => {
        onSetActivarEvento({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Gerardo'
            }
        });
        openModal();
    };


    return (
        <button className="btn btn-primary fab" onClick={handleClickNew}>
            <i className="fas fa-plus"></i>
        </button>
    )
}

export default BotonAddNew;