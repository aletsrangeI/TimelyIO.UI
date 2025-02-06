import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const personasApi = createApi({
  reducerPath: 'personasApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5172/api/' }),
  tagTypes: ['Personas'],
  endpoints: (builder) => ({
    authenticatePerson: builder.mutation({
      query: (data) => ({
        url: 'Personas/Authenticate',
        method: 'POST',
        body: data,
      }),
    }),
    registerPerson: builder.mutation({
      query: (data) => ({
        url: 'Personas/Register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Personas'],
    }),
    getAllPersons: builder.query({
      query: () => 'Personas/GetAll',
      providesTags: ['Personas'],
    }),
    getPersonById: builder.query({
      query: (id) => `Personas/GetById/${id}`,
      providesTags: ['Personas'],
    }),
    updatePerson: builder.mutation({
      query: (data) => ({
        url: 'Personas/Update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Personas'],
    }),
    deletePerson: builder.mutation({
      query: (id) => ({
        url: `Personas/Delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Personas'],
    }),
  }),
});

export const {
  useAuthenticatePersonMutation,
  useRegisterPersonMutation,
  useGetAllPersonsQuery,
  useGetPersonByIdQuery,
  useUpdatePersonMutation,
  useDeletePersonMutation,
} = personasApi;
