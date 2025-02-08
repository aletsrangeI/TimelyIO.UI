import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const formFieldApi = createApi({
  reducerPath: 'formFieldApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ['FormField'],
  endpoints: (builder) => ({
    insertFormField: builder.mutation({
      query: (data) => ({
        url: 'FormField/Insert',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FormField'],
    }),
    updateFormField: builder.mutation({
      query: (data) => ({
        url: 'FormField/Update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['FormField'],
    }),
    deleteFormField: builder.mutation({
      query: (id) => ({
        url: 'FormField/Delete',
        method: 'DELETE',
        params: { id },
      }),
      invalidatesTags: ['FormField'],
    }),
    getAllFormFields: builder.query({
      query: () => 'FormField/GetAll',
      providesTags: ['FormField'],
    }),
    getFormFieldById: builder.query({
      query: (id) => `FormField/GetById/${id}`,
      providesTags: ['FormField'],
    }),
    getFormFieldsWithPagination: builder.query({
      query: ({ page, pageSize }) => ({
        url: 'FormField/GetallWithPagination',
        params: { page, pageSize },
      }),
      providesTags: ['FormField'],
    }),
    countFormFields: builder.query({
      query: () => 'FormField/Count',
    }),
    getFormFieldByFormCatId: builder.query({
      query: (id) => `FormField/GetFormFieldByFormCatId/${id}`,
      providesTags: ['FormField'],
    }),
  }),
});

export const {
  useInsertFormFieldMutation,
  useUpdateFormFieldMutation,
  useDeleteFormFieldMutation,
  useGetAllFormFieldsQuery,
  useGetFormFieldByIdQuery,
  useGetFormFieldsWithPaginationQuery,
  useCountFormFieldsQuery,
  useGetFormFieldByFormCatIdQuery,
} = formFieldApi;
