import { Field } from "formik";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

export const SelectField = ({ label, name, options, sx, ...props }) => {
    return (
        <Field name={name}>
            {({ field, meta }) => (
                <FormControl
                    fullWidth
                    margin="normal"
                    error={meta.touched && Boolean(meta.error)}
                >
                    <InputLabel id={`${name}-label`}>{label}</InputLabel>
                    <Select
                        labelId={`${name}-label`}
                        label={label}
                        {...field}
                        {...props}
                        sx={sx}
                        value={field.value || ""} // Asegúrate de que siempre haya un valor válido
                    >
                        {options.length > 0 ? (
                            options.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.nombre}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No roles available</MenuItem>
                        )}
                    </Select>
                    {meta.touched && meta.error && (
                        <FormHelperText>{meta.error}</FormHelperText>
                    )}
                </FormControl>
            )}
        </Field>
    )
}