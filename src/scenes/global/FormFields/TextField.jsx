import { TextField as MuiTextField } from "@mui/material";
import { Field } from "formik";

export const TextField = ({ label, name, sx, type, placeholder, ...props }) => {

    return (
        <Field name={name}>
            {({ field, meta }) => (
                <MuiTextField
                    {...field}
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
        </Field>
    )

}