import * as Yup from 'yup';
import { useGetFormFieldByFormCatIdQuery } from '../../../store/api';

export const useLoginForm = (selectedUser = null) => {
  // Obtener los campos del formulario desde la API
  const { data: fields, error, isLoading, isFetching } = useGetFormFieldByFormCatIdQuery(1);

  // Construir los valores iniciales y el esquema de validación
  const initialValues = {};
  const requiredFields = {};

  if (!fieldsLoading && fields?.data) {
    for (const input of fields.data) {
      // Valores iniciales
      initialValues[input.name] = selectedUser?.[input.name] || '';

      if (input.name === 'password') {
        initialValues.password = '';
        initialValues.confirmPassword = '';
      }

      if (input.name === 'rol') {
        initialValues.rol = selectedUser?.rolId || 0;
      }

      // Validaciones
      if (!input.validations) continue;

      let schema = Yup.string();

      for (const validation of input.validations) {
        if (validation.type === 'required') {
          schema = schema.required('Este campo es requerido');
        }

        if (validation.type === 'email') {
          schema = schema.email('Revise el formato del email');
        }

        if (validation.type === 'minLength') {
          schema = schema.min(validation.value || 2, `Mínimo de ${validation.value || 2} caracteres`);
        }
      }
      requiredFields[input.name] = schema;
    }
  }

  // Esquema de validación
  const validationSchema = Yup.object({ ...requiredFields });

  return {
    fields: fields?.data || [],
    initialValues,
    validationSchema,
    isLoading: fieldsLoading,
  };
};
