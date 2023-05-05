

export const eventos = [
    {
        id: '123',
        start: new Date('2021-09-01T12:00:00'),
        end: new Date('2021-09-01T14:00:00'),
        title: 'Mi Cumpleaños',
        notes: 'Comprar el pastel',
    },
    {
        id: '456',
        start: new Date('2021-09-02T12:00:00'),
        end: new Date('2021-09-02T14:00:00'),
        title: 'Futbol',
        notes: 'Juega Boca vs River',
    },
    
];



export const initialState = {
    isLoadingEventos: true,
    events: [
        //Eventos...
    ],
    activeEvent: null
};



export const calendarioWithEventosState = {
    isLoadingEventos: false,
    events: [...eventos],
    activeEvent: null
};


export const calendarioWithActiveEventState = {
    isLoadingEventos: false,
    events: [...eventos],
    activeEvent: {
        ...eventos[0]   // Se toma el primer evento.
    }
};