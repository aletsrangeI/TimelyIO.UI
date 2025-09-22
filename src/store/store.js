import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { catalogoApi, contenidoCatalogoApi, formFieldApi, personasApi } from './api';
import { loadAuthState, persistAuthState } from './persistence';

const authPersistenceListener = createListenerMiddleware();

authPersistenceListener.startListening({
  predicate: (action, currentState, previousState) => currentState?.auth !== previousState?.auth,
  effect: (_, listenerApi) => {
    const { auth } = listenerApi.getState();
    persistAuthState(auth);
  },
});

const preloadedAuthState = loadAuthState();
const preloadedState = preloadedAuthState
  ? { auth: { ...authSlice.getInitialState(), ...preloadedAuthState } }
  : undefined;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [catalogoApi.reducerPath]: catalogoApi.reducer,
    [contenidoCatalogoApi.reducerPath]: contenidoCatalogoApi.reducer,
    [formFieldApi.reducerPath]: formFieldApi.reducer,
    [personasApi.reducerPath]: personasApi.reducer
  },

  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(authPersistenceListener.middleware)
      .concat(
        catalogoApi.middleware,
        contenidoCatalogoApi.middleware,
        formFieldApi.middleware,
        personasApi.middleware
      ),
});
