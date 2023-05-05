import calendarioApi from "../../src/api/calendarioApi";


describe('Pruebas en CalendarioApi', () => {

    test('debe tener la configuración por defecto', () => {

        expect( calendarioApi.defaults.baseURL ).toBe( process.env.VITE_API_URL );
    });


    test('debe tener el x-token en el headerr de todas las peticiones',async () => {

        const token = '123-abc-456-def';
        localStorage.setItem("token", token);
        const res = await calendarioApi.get("/auth");

        expect(res.config.headers["x-token"]).toBe(token);
    });
});