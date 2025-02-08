import * as Yup from "yup";
import { Box, Button, Divider, Skeleton, Typography } from "@mui/material";
import { TextField } from "./FormFields";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import useLoginStyles from "./hooks/useLoginStyles";

export const GenericForm = ({ formFields, initialValues, validationSchema, onSubmit, submitButtonText, loading, title }) => {
    const styles = useLoginStyles();

    return (
        <Box sx={styles.formWrapper}>
            <Box sx={styles.formContainer}>
                <Typography variant="h3" sx={styles.title}>
                    {title}
                </Typography>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={onSubmit}
                >
                    {(formik) => (
                        <Form>
                            {formFields.map(
                                ({ id, type, name, placeholder, label, options }, index) => {

                                    switch (type) {
                                        case "text":
                                        case "email":
                                        case "password":
                                        case "input":
                                            return (
                                                <TextField
                                                    key={index}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    name={name}
                                                    type={type}
                                                    sx={styles.textField}
                                                    fullWidth
                                                />
                                            );
                                        case "select":
                                            // Implementar el componente de selección si es necesario
                                            return null;
                                        default:
                                            return null;
                                    }
                                })}
                            <Button type="submit" variant="contained" fullWidth sx={styles.submitButton}>
                                {submitButtonText}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};
