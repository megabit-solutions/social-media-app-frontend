import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["Me", "Auth"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "post",
      }),
      invalidatesTags: ["Me", "Auth"],
    }),

    me: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "get",
      }),
      providesTags: ["Me"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi;
