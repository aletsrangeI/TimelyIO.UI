# Persistencia del estado de autenticación

Este módulo centraliza la sincronización del estado de autenticación de Redux con `localStorage`.

## Flujo general

1. `loadAuthState` (ver [`persistence.js`](./persistence.js)) intenta cargar `authState` desde `localStorage` cuando se crea la store.
   - Si el estado está ausente o el token expiró, se devuelve `undefined` y se limpia la entrada persistida.
2. `store.js` usa ese resultado como `preloadedState` de `auth`, combinándolo con los valores por defecto del _slice_.
3. El _listener middleware_ definido en `store.js` observa cualquier cambio en `state.auth`.
4. Después de cada cambio válido, `persistAuthState` decide si debe persistir el estado (solo cuando la sesión está autenticada y el token sigue vigente) o limpiar la clave.

## Hidratación inicial (`loadAuthState`)

- Opera únicamente cuando `localStorage` está disponible (evita fallos durante pruebas o _server-side rendering_).
- Normaliza la sesión devolviendo `undefined` cuando el token haya caducado, lo cual provoca que la store parta del estado por defecto.
- El middleware se encarga de mantener la persistencia actualizada, por lo que `authSlice` ya no interactúa directamente con `localStorage`.

## Sincronización con `localStorage`

- El listener se suscribe a cualquier acción que modifique `auth` (incluyendo `login`, `logout` y `checkTokenExpiration`).
- Si la sesión está autenticada y el token es válido, se guarda un `JSON` de `auth` bajo la clave `authState`.
- Si la sesión pasa a no autenticada o el token caduca, se elimina la clave para evitar rehidrataciones inválidas.

## Pruebas manuales

### Persistencia tras recargar

1. Inicia la aplicación (`npm run dev`) e inicia sesión con credenciales válidas.
2. Abre las herramientas de desarrollador del navegador y confirma que existe la clave `authState` en `Application → Local Storage`.
3. Recarga la página. La aplicación debe continuar autenticada y la clave debe mantenerse intacta.

### Expiración del token

1. Con la sesión iniciada, abre la consola del navegador.
2. Ejecuta el siguiente script para forzar la caducidad inmediata del token persistido:

   ```js
   const auth = JSON.parse(localStorage.getItem('authState'));
   auth.expiration = Date.now() - 1000;
   localStorage.setItem('authState', JSON.stringify(auth));
   ```

3. Recarga la página. La aplicación debe iniciar en estado no autenticado y la clave `authState` debe desaparecer.

> **Nota:** También puedes verificar que cerrar sesión desde la interfaz limpia `localStorage` automáticamente.

