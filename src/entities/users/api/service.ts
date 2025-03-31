import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UsersType } from "../model/users.type";

const BASE_URL = 'http://localhost:8000';

type UserDTO = UsersType[];

export const usersApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserDTO, void>({
      query: () => 'users',
      // transformResponse: (response: UserDTO) => {
      //   return {
      //     ...response,
      //     users: response.users.map((item, index) => ({...item, id: index + 1}))
      //   }
      // }
    }),

    getUserById: builder.query<UsersType, number>({
      query: (id: number) => `users/${id}`,
    }),
  }),
})

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;