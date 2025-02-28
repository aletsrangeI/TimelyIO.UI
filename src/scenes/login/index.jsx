import { useDispatch } from "react-redux";
import { useAuthenticatePersonMutation, useGetFormFieldByFormCatIdQuery } from "../../store/api";
import { GenericForm } from "../global/GenericForm";
import useLoginStyles from "./hooks/useLoginStyles";
import { CircularProgress, Box, Alert } from "@mui/material";
import { login } from "../../store/auth";
import { useForm } from "../global/hooks/useForm";

export const Login = () => {
    const dispatch = useDispatch();
    const { data: fields, error, isLoading, isFetching } = useGetFormFieldByFormCatIdQuery(1);
    const [authUser] = useAuthenticatePersonMutation();
    const { initialValues, validationSchema } = useForm(fields, isLoading || isFetching);
    const styles = useLoginStyles();

    const handleSubmit = async (values) => {
        try {
            const payload = {
                email: values.email,
                password: values.password
            };

            console.log(payload);

            const response = await authUser(payload).unwrap();

            if (response.isSuccess) {
                dispatch(login({
                    userId: response.data.id,
                    email: response.data.email,
                    nombres: `${response.data.nombres} ${response.data.apellidos}`,
                    token: response.data.token,
                    expiresIn: 3600,
                }));
            } else {
                alert(response.message || 'Error al iniciar sesión');
            }

        } catch (error) {
            console.error('Error de autenticación:', error);
            alert(error.data?.message || 'Error al iniciar sesión');
        }
    }

    if (isLoading || isFetching) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Alert severity="error">
                    Error: {error.message}
                </Alert>
            </Box>
        );
    }

    if (!fields?.data || fields.data.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Alert severity="warning">
                    No hay datos disponibles.
                </Alert>
            </Box>
        );
    }

    return (
        <>
            <GenericForm
                formFields={fields.data}
                initialValues={initialValues}
                validationSchema={validationSchema}
                submitButtonText="Iniciar Sesion"
                loading={isLoading}
                title="Timely"
                styles={styles}
                onSubmit={handleSubmit}
            />
        </>
    );
};