// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUser } from "../features/auth/authSlice";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://job-box-server-git-main-aamiraj.vercel.app/" }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        url: "user",
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query(data) {
        const { email, ...body } = data;
        return {
          url: `user/${email}`,
          method: "PATCH",
          body: body,
        };
      },
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          console.log(res);
          if (res.acknowledged) {
            dispatch(getUser(data.email));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddUserMutation, useUpdateUserMutation } = authApi;
