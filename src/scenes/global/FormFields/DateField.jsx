import { Field, useFormikContext } from "formik"; // Importar useFormikContext
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField as MuiTextField } from "@mui/material";
import dayjs from "dayjs"; // Importar dayjs

export const DateField = ({ label, name, sx, type, placeholder, ...props }) => {
    const form = useFormikContext(); // Obtener el contexto de Formik

    return (
        <Field name={name}>
            {({ field, meta }) => {
                const formatDate = (date) => {
                    if (!date) return null;
                    return dayjs(date).format("YYYY-MM-DD");
                };

                const handleChange = (date) => {
                    const formattedDate = formatDate(date);
                    form.setFieldValue(name, formattedDate);
                };

                const value = field.value ? dayjs(field.value) : null;

                return (
                    <DatePicker
                        label={label}
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => (
                            <MuiTextField
                                {...params}
                                label={label}
                                placeholder={placeholder}
                                fullWidth
                                margin="normal"
                                sx={sx}
                                error={meta.touched && Boolean(meta.error)}
                                helperText={meta.touched && meta.error}
                                type={type}
                                {...props}
                            />
                        )}
                    />
                );
            }}
        </Field>
    );
};