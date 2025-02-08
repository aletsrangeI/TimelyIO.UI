import { useDispatch } from "react-redux";
import { useGetFormFieldByFormCatIdQuery } from "../../store/api";
import * as Yup from "yup";
import { GenericForm } from "../global/GenericForm";

export const Login = ({ selectedUser = null }) => {
    const dispatch = useDispatch();
    const { data: fields, error, isLoading, isFetching } = useGetFormFieldByFormCatIdQuery(1);

    const initialValues = {};
    const requiredFields = {};

    // Solo construir los valores iniciales y las validaciones si los datos están cargados
    if (!isLoading && fields?.data) {
        for (const input of fields.data) {
            // Valores iniciales
            initialValues[input.name] = selectedUser?.[input.name] || "";

            if (input.name === "password") {
                initialValues.password = "";
                initialValues.confirmPassword = "";
            }

            if (input.name === "rol") {
                initialValues.rol = selectedUser?.rolId || 0;
            }

            // Validaciones
            if (!input.validations) continue;

            let schema = Yup.string();

            for (const validation of input.validations) {
                if (validation.type === "required") {
                    schema = schema.required("Este campo es requerido");
                }

                if (validation.type === "email") {
                    schema = schema.email("Revise el formato del email");
                }

                if (validation.type === "minLength") {
                    schema = schema.min(validation.value || 2, `Mínimo de ${validation.value || 2} caracteres`);
                }
            }
            requiredFields[input.name] = schema;
        }
    }

    // Creación del esquema de validación final
    const validationSchema = Yup.object({ ...requiredFields });

    // Renderiza solo si los datos están disponibles o cargando
    return (
        <>
            {isLoading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p>Error: {JSON.stringify(error)}</p>
            ) : fields?.data && fields.data.length ? (
                <GenericForm
                    formFields={fields.data} // Enviamos los campos como están
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    submitButtonText="Iniciar Sesion"
                    loading={isLoading}
                    title="Timely"
                />
            ) : (
                <p>No hay datos disponibles.</p>
            )}
        </>
    );
};
