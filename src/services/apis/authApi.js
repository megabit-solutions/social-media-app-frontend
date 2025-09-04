import { apiSlice } from "../apiSlice";
import Cookies from "js-cookie";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Store tokens in cookies
          Cookies.set("accessToken", data.accessToken, { expires: 1 });
          Cookies.set("refreshToken", data.refreshToken, { expires: 7 });
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        data: userData,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.accessToken && data.refreshToken) {
            Cookies.set("accessToken", data.accessToken, { expires: 1 });
            Cookies.set("refreshToken", data.refreshToken, { expires: 7 });
          }
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          // Always clear tokens on logout
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
        }
      },
    }),

    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/auth/refresh",
        method: "POST",
        data: { refreshToken },
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          Cookies.set("accessToken", data.accessToken, { expires: 1 });
          Cookies.set("refreshToken", data.refreshToken, { expires: 7 });
        } catch (error) {
          console.error("Token refresh failed:", error);
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
        }
      },
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (userData) => ({
        url: "/auth/profile",
        method: "PUT",
        data: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
