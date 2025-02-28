import { useState } from "react";
import {
    useGetContenidoCatalogoByCatalogoIdQuery, useInsertContenidoMutation,
    useUpdateContenidoMutation,
    useDeleteContenidoMutation,
    useGetFormFieldByFormCatIdQuery,
} from "../../../store/api";
import { useForm } from "../../global/hooks/useForm";

export const Contenido = (idCatalogo = 1) => {

    const { data, isLoading } = useGetContenidoCatalogoByCatalogoIdQuery(idCatalogo);
    const { data: fields, isLoading: isFieldsLoading, isFetching } = useGetFormFieldByFormCatIdQuery(7); // ID del formulario
    const [insertContenidoCatalogo] = useInsertContenidoMutation();
    const [updateContenidoCatalogo] = useUpdateContenidoMutation();
    const [deleteContenidoCatalogo] = useDeleteContenidoMutation();

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
        { field: "opcional", headerName: "Opcional", flex: 1 }
    ];



    return (
        <div>

        </div>
    )
}