import { parseISO } from "date-fns";


const convertFechasToDate = ( eventos = [] ) => {
    return eventos.map(
        ( evento ) => {
            evento.start = parseISO( evento.start );
            evento.end = parseISO( evento.end );

            return evento;
        }
    );
};


export default convertFechasToDate;