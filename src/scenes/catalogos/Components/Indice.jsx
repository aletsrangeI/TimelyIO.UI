import { useState } from "react";
import {
    useGetAllCatalogosQuery, useGetFormFieldByFormCatIdQuery, useInsertCatalogoMutation,
    useUpdateCatalogoMutation,
    useDeleteCatalogoMutation,
} from "../../../store/api";
import { GenericCrudTable } from "../../global/GenericCrudTable";
import { useForm } from "../../global/hooks/useForm";
import { ModalForm } from "../../global/ModalForm";
import { GenericAlert } from "../../global/GenericAlert";

export const Indice = () => {
    const { data, isLoading } = useGetAllCatalogosQuery();
    const { data: fields, isLoading: isFieldsLoading, isFetching } = useGetFormFieldByFormCatIdQuery(7); // ID del formulario
    const [createCatalogo] = useInsertCatalogoMutation();
    const [updateCatalogo] = useUpdateCatalogoMutation();
    const [deleteCatalogo] = useDeleteCatalogoMutation();

    const { initialValues, validationSchema } = useForm(fields, isLoading || isFetching);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');

    const handleOpen = (catalogo = null) => {

        console.log(catalogo);

        setSelectedRow(catalogo);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedRow(null);
    };

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    const handleSubmit = async (values) => {
        try {
            let response;
            if (selectedRow) {
                console.log("Selected catalogo", selectedRow);
                response = await updateCatalogo({ selectedRow, ...values }).unwrap();
            } else {
                response = await createCatalogo({ ...values }).unwrap();
            }

            setAlertSeverity('success');
            setAlertMessage(response.message || 'Operación completada con éxito');
            setAlertOpen(true);

            handleClose();
        } catch (error) {
            console.error("Error al guardar catalogo:", error);

            setAlertSeverity('error');

            if (error.data && error.data.errors) {
                const errorMessages = Object.values(error.data.errors).flat().join(', ');
                setAlertMessage(`Errores: ${errorMessages}`);
            } else if (error.data && error.data.title) {
                setAlertMessage(error.data.title);
            } else {
                setAlertMessage('Hubo un error al procesar la solicitud');
            }
            setAlertOpen(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            let response;
            response = await deleteCatalogo(id);

            setAlertSeverity('success');
            setAlertMessage(response.message || 'Operación completada con éxito');
            setAlertOpen(true);

        } catch (error) {
            console.error("Error al guardar catalogo:", error);

            setAlertSeverity('error');

            if (error.data && error.data.errors) {
                const errorMessages = Object.values(error.data.errors).flat().join(', ');
                setAlertMessage(`Errores: ${errorMessages}`);
            } else if (error.data && error.data.title) {
                setAlertMessage(error.data.title);
            } else {
                setAlertMessage('Hubo un error al procesar la solicitud');
            }
            setAlertOpen(true);
        }
    }

    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "nombre", headerName: "Nombre", flex: 1 },
        { field: "descripcion", headerName: "Descripcion", flex: 1 },
    ];
    return (
        <>
            <GenericCrudTable
                data={data?.data || []}
                columns={columns}
                onAdd={() => handleOpen()}
                onEdit={(row) => handleOpen(row)}
                onDelete={(id) => handleDelete(id)}
                isLoading={isLoading}
                title="Lista de Catalogos"
                subTitle="Gestión de catalogos"
            />

            <ModalForm
                open={open}
                onClose={handleClose}
                title={selectedRow ? "Editar Catalogo" : "Agregar Catalogo"}
                formFields={fields?.data || []}
                initialValues={selectedRow || initialValues}
                validationSchema={validationSchema} // Agrega validaciones si es necesario
                onSubmit={handleSubmit}
                submitButtonText={selectedRow ? "Actualizar" : "Agregar"}
                isLoading={isFieldsLoading}
                error={null} // Puedes manejar errores aquí
            />

            <GenericAlert
                open={alertOpen}
                onClose={handleCloseAlert}
                severity={alertSeverity}
                message={alertMessage}
            />
        </>
    )
}
