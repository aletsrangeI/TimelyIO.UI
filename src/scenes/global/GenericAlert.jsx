import { Alert, Snackbar } from '@mui/material';

export const GenericAlert = ({ open, onClose, severity, message }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000} // Duración en milisegundos (6 segundos)
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Posición de la alerta
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};