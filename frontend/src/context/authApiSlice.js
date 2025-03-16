import { apiSlice } from "./api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (credentials) => ({
        url: "api/signup",
        method: "POST",
        body: credentials,
      }),
    }),
   
    login: builder.mutation({
      query: (credentials) => ({
        url: "api/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
export const { useRegistrationMutation,useLoginMutation} = authApiSlice; 