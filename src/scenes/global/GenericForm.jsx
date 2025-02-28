import * as Yup from "yup";
import { Box, Button, Typography } from "@mui/material";
import { DateField, SelectField, TextField } from "./FormFields";
import { Formik, Form } from "formik";

export const GenericForm = ({ formFields, initialValues, validationSchema, onSubmit, submitButtonText, title, styles = {} }) => {
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
                                                    value={formik.values[name] || ''}
                                                    onBlur={formik.handleBlur}
                                                    fullWidth
                                                />
                                            );
                                        case "select":
                                            return (
                                                <SelectField
                                                    key={name}
                                                    label={label}
                                                    name={name}
                                                    options={options}
                                                    placeholder={placeholder}
                                                />
                                            );
                                        case "date":
                                            return (
                                                <DateField
                                                    key={name}
                                                    label="Fecha de nacimiento"
                                                    name="fechaNacimiento"
                                                    placeholder="Selecciona una fecha"
                                                    sx={{ mt: 3 }}
                                                />
                                            );
                                        default:
                                            return null;
                                    }
                                })}
                            <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ ...styles.submitButton, mt: 2 }} disabled={formik.isSubmitting}>
                                {submitButtonText}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};
