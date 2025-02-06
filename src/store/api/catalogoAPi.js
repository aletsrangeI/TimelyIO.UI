import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const catalogoApi = createApi({
  reducerPath: 'catalogoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.0.35/api/' }),
  tagTypes: ['Catalogo'],
  endpoints: (builder) => ({
    insertCatalogo: builder.mutation({
      query: (data) => ({
        url: 'Catalogo/Insert',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Catalogo'],
    }),
    updateCatalogo: builder.mutation({
      query: (data) => ({
        url: 'Catalogo/Update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Catalogo'],
    }),
    deleteCatalogo: builder.mutation({
      query: (id) => ({
        url: 'Catalogo/Delete',
        method: 'DELETE',
        params: { id },
      }),
      invalidatesTags: ['Catalogo'],
    }),
    getAllCatalogos: builder.query({
      query: () => 'Catalogo/GetAll',
      providesTags: ['Catalogo'],
    }),
    getCatalogoById: builder.query({
      query: (id) => `Catalogo/GetById/${id}`,
      providesTags: ['Catalogo'],
    }),
    getCatalogosWithPagination: builder.query({
      query: ({ page, pageSize }) => ({
        url: 'Catalogo/GetallWithPagination',
        params: { page, pageSize },
      }),
      providesTags: ['Catalogo'],
    }),
    countCatalogos: builder.query({
      query: () => 'Catalogo/Count',
    }),
  }),
});

export const {
  useInsertCatalogoMutation,
  useUpdateCatalogoMutation,
  useDeleteCatalogoMutation,
  useGetAllCatalogosQuery,
  useGetCatalogoByIdQuery,
  useGetCatalogosWithPaginationQuery,
  useCountCatalogosQuery,
} = catalogoApi;
