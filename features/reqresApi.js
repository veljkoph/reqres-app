import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reqresApi = createApi({
    reducerPath: 'reqresApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://reqres.in/api/' }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                url: 'users',
                method: 'POST',
                body: user,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        getUsers: builder.query({
            query: ({ page }) => `users?page=${page}`,

        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `delete/${id}`,
                method: 'DELETE',
            }),
        }),
        patchUser: builder.mutation({
            query: ({ id, name, job }) => ({
                url: `users/${id}`,
                method: 'PATCH',
                body: { name, job },
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useGetUsersQuery, useDeleteUserMutation, usePatchUserMutation } = reqresApi;
