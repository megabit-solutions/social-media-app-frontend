import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../lib/axiosBaseQuery";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
