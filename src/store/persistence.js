const AUTH_STORAGE_KEY = 'authState';

const getStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }

  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }

  return null;
};

const shouldPersistAuthState = (authState) =>
  authState && authState.status === 'authenticated' && authState.authToken;

export const loadAuthState = () => {
  const storage = getStorage();

  if (!storage) {
    return undefined;
  }

  try {
    const serializedState = storage.getItem(AUTH_STORAGE_KEY);

    if (!serializedState) {
      return undefined;
    }

    const parsedState = JSON.parse(serializedState);

    if (parsedState.expiration && Date.now() > parsedState.expiration) {
      storage.removeItem(AUTH_STORAGE_KEY);
      return undefined;
    }

    return parsedState;
  } catch (error) {
    console.warn('No se pudo cargar el estado de autenticación desde localStorage.', error);
    return undefined;
  }
};

export const persistAuthState = (authState) => {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  try {
    if (!shouldPersistAuthState(authState)) {
      storage.removeItem(AUTH_STORAGE_KEY);
      return;
    }

    if (authState.expiration && Date.now() > authState.expiration) {
      storage.removeItem(AUTH_STORAGE_KEY);
      return;
    }

    const serializedState = JSON.stringify(authState);
    storage.setItem(AUTH_STORAGE_KEY, serializedState);
  } catch (error) {
    console.warn('No se pudo persistir el estado de autenticación en localStorage.', error);
  }
};

