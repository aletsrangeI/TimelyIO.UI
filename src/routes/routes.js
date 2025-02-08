import { useEffect } from 'react';
import { useGetContenidoCatalogoByCatalogoId } from '../store/api';

export const routes = () => {
  const { data, isLoading, isError } = useGetContenidoCatalogoByCatalogoId(2);
  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    if (data.isSuccess) {
      const formattedRoutes = data.data.map((ruta) => ({
        name: ruta.nombre,
        path: `/${ruta.nombre.toLowerCase()}`,
        description: ruta.descripcion,
      }));
      setRutas(formattedRoutes);
    }
  }, [data]);
  return { rutas, isLoading, isError };
};
