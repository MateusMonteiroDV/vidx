import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../authSlice.js";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  credentials:"include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("sending refresh token");
    
    const refreshResult = await baseQuery("api/refresh", api, extraOptions);
   
    console.log(refreshResult);
   
    if (refreshResult?.data) {
     
      api.dispatch(setCredentials( refreshResult.data));
     
      result = await baseQuery(args, api, extraOptions);
    
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});