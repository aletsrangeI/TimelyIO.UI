import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, CircularProgress, useMediaQuery, Button } from "@mui/material";
import { Header } from "../../components/Header";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";

export const GenericCrudTable = ({ data, columns, onAdd, onEdit, onDelete, title, subTitle, isLoading }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isSmallScreen = useMediaQuery("(max-width:150px)");

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box m="20px">
            <Header title={title} subTitle={subTitle} />
            <Box
                m="40px 0 0 0"
                height={isSmallScreen ? "auto" : "75vh"}
                width="100%"
                sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .name-colum--cell": { color: colors.greenAccent[300] },
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={data || []}
                    columns={columns.concat({
                        field: "actions",
                        headerName: "Actions",
                        width: isSmallScreen ? 100 : 150,
                        renderCell: (params) => (
                            <Box display="flex" gap={1}>
                                <Button size="small" variant="contained" color="secondary" sx={{ mt: 1 }} onClick={() => onEdit(params.row)}>
                                    Editar
                                </Button>
                                <Button size="small" variant="contained" color="error" sx={{ mt: 1 }} onClick={() => onDelete(params.row.id)}>
                                    Eliminar
                                </Button>
                            </Box>
                        ),
                    })}
                    slots={{
                        toolbar: () => (
                            <GridToolbarContainer sx={{ mb: 2 }}>
                                <GridToolbar />
                                <Button variant="contained" color="secondary" onClick={onAdd} sx={{ ml: "auto" }}>
                                    Agregar
                                </Button>
                            </GridToolbarContainer>
                        ),
                    }}
                    loading={isLoading}
                    autoHeight={isSmallScreen}
                />
            </Box>
        </Box>
    );
};
