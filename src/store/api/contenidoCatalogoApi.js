import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contenidoCatalogoApi = createApi({
  reducerPath: 'contenidoCatalogoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5172/api/' }),
  tagTypes: ['ContenidoCatalogo'],
  endpoints: (builder) => ({
    insertContenido: builder.mutation({
      query: (data) => ({
        url: 'ContenidoCatalogo/Insert',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ContenidoCatalogo'],
    }),
    updateContenido: builder.mutation({
      query: (data) => ({
        url: 'ContenidoCatalogo/Update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ContenidoCatalogo'],
    }),
    deleteContenido: builder.mutation({
      query: (id) => ({
        url: 'ContenidoCatalogo/Delete',
        method: 'DELETE',
        params: { id },
      }),
      invalidatesTags: ['ContenidoCatalogo'],
    }),
    getAllContenidos: builder.query({
      query: () => 'ContenidoCatalogo/GetAll',
      providesTags: ['ContenidoCatalogo'],
    }),
    getContenidoById: builder.query({
      query: (id) => `ContenidoCatalogo/GetById/${id}`,
      providesTags: ['ContenidoCatalogo'],
    }),
    getContenidoWithPagination: builder.query({
      query: ({ page, pageSize }) => ({
        url: 'ContenidoCatalogo/GetallWithPagination',
        params: { page, pageSize },
      }),
      providesTags: ['ContenidoCatalogo'],
    }),
    countContenidos: builder.query({
      query: () => 'ContenidoCatalogo/Count',
    }),
  }),
});

export const {
  useInsertContenidoMutation,
  useUpdateContenidoMutation,
  useDeleteContenidoMutation,
  useGetAllContenidosQuery,
  useGetContenidoByIdQuery,
  useGetContenidoWithPaginationQuery,
  useCountContenidosQuery,
} = contenidoCatalogoApi;
