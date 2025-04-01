import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UsersType } from "../model/users.type";

const BASE_URL = 'http://localhost:8000';

type UserDTO = UsersType[];

export const usersApi = createApi({
  reducerPath: 'user',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({

    getUsers: builder.query<UserDTO, void>({
      query: () => 'users',
      providesTags: (result) => result 
      ? [ ...result.map(({ id }) => ({ type: 'User' as const, id })), { type: 'User', id: 'LIST' },]
      : [{ type: 'User', id: 'LIST' }],
    }),

    getUserById: builder.query<UsersType, number>({
      query: (id: number) => `users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }]
    }),

    updateUser: builder.mutation<void, Pick<UsersType, 'id'> & Partial<UsersType>>({
      query: ({ id, ...body }) => ({
          url: `users/${id}`,
          method: "PATCH",
          body
      }),
      async onQueryStarted({id, ...body}, {dispatch, queryFulfilled}) {
        const patchResult = dispatch ( usersApi.util.updateQueryData('getUserById', id, (draft) => {
          Object.assign(draft, body);
        }),
      ) 
      try {
        await queryFulfilled
      } catch {
        patchResult.undo()
      }},
      invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }]
    })
    
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useUpdateUserMutation  } = usersApi;