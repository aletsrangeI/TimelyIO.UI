import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'unauthenticated',
  userId: null,
  email: null,
  nombres: null,
  photoURL: null,
  authToken: null,
  expiration: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { userId, email, nombres, token, expiresIn } = action.payload;

      state.status = 'authenticated';
      state.userId = userId;
      state.email = email;
      state.nombres = nombres;
      state.authToken = token;

      const expirationDuration = Number(expiresIn) || 3600; // 1 hora por defecto

      // Calcular la fecha de expiración del token (en milisegundos)
      state.expiration = new Date().getTime() + expirationDuration * 1000;

    },
    logout: (state) => {
      state.status = 'unauthenticated';
      state.userId = null;
      state.email = null;
      state.nombres = null;
      state.photoURL = null;
      state.authToken = null;
      state.expiration = null;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
    checkTokenExpiration: (state) => {
      if (state.expiration && new Date().getTime() > state.expiration) {
        return authSlice.caseReducers.logout(state);
      }
    },
  },
});

export const { login, logout, checkingCredentials, checkTokenExpiration } = authSlice.actions;
