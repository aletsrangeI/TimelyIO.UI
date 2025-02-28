import * as Yup from 'yup';

export const useForm = (fields, fieldsLoading) => {
  const initialValues = {};
  const requiredFields = {};

  if (!fieldsLoading && fields?.data) {
    for (const input of fields.data) {
      let schema = Yup.string();

      if (input.name === 'password') {
        initialValues.password = '';
        initialValues.confirmPassword = ''; // Agregamos confirmPassword
      }

      if (!input.validations) continue;

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

        if (validation.type === 'phone') {
          schema = schema.matches(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, 'Número de teléfono no válido');
        }
      }

      requiredFields[input.name] = schema;
    }
  }

  const validationSchema = Yup.object({ ...requiredFields });

  return {
    initialValues,
    validationSchema,
  };
};
