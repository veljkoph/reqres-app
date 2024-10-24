import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'
import { reqresApi } from '../features/reqresApi';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [reqresApi.reducerPath]: reqresApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(reqresApi.middleware),
});
