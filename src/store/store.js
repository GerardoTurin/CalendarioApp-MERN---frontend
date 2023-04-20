import { configureStore } from "@reduxjs/toolkit";
import { calendarioSlice } from "./calendario/calendarioSlice";
import { uiSlice } from "./ui/uiSlice";
import { authSlice } from "./auth/authSlice";



export const store = configureStore({
    reducer: {
        // Aqui se agregan los reducers.
        ui: uiSlice.reducer,
        calendario: calendarioSlice.reducer,
        auth: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});