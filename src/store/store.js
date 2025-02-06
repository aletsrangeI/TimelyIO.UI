import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { catalogoApi, contenidoCatalogoApi, formFieldApi, personasApi } from './api';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [catalogoApi.reducerPath]: catalogoApi.reducer,
    [contenidoCatalogoApi.reducerPath]: contenidoCatalogoApi.reducer,
    [formFieldApi.reducerPath]: formFieldApi.reducer,
    [personasApi.reducerPath]: personasApi.reducer
  },

  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
    catalogoApi.middleware, 
    contenidoCatalogoApi.middleware, 
    formFieldApi.middleware,
    personasApi.middleware
  ),
});
