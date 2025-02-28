import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Alert, Box, CircularProgress, Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { GenericForm } from "./GenericForm";

export const ModalForm = ({ open, onClose, title, formFields, initialValues, validationSchema, onSubmit, submitButtonText, isLoading, error }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: colors.primary[400], // Color principal del tema
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    return (
        <Modal
            open={open}
            onClose={onClose} // Se mantiene, pero gestionaremos el clic fuera del modal manualmente
            aria-labelledby="modal-form-title"
            aria-describedby="modal-form-description"
        >
            <Box sx={modalStyle}>
                {/* Botón de cerrar con "X" en la esquina superior derecha */}
                <Box position="absolute" top={0} right={0} p={1}>
                    <IconButton onClick={onClose} sx={{ color: colors.grey[100] }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Typography id="modal-form-title" variant="h6" component="h2" gutterBottom sx={{ color: colors.grey[100] }}>
                    {title}
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
                        <CircularProgress />
                    </Box>
                ) : (
                    <GenericForm
                        formFields={formFields}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        submitButtonText={submitButtonText}
                        onSubmit={onSubmit}
                    />
                )}

            </Box>
        </Modal>
    );
};
