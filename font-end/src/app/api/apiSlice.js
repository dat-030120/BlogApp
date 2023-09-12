import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../../redux/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    if (token) {
      headers.set("x-access-token", `${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/user/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const fullname = api.getState().auth.fullname;
      // store the new token
      api.dispatch(
        setCredentials({ token: refreshResult.data, fullname: fullname })
      );
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const api = createApi({
  // Tương tự tên Slice khi tạo Slice thông thường
  reducerPath: "api",

  // Cấu hình chung cho tất cả request
  baseQuery: baseQueryWithReauth,
  // Các endpoints (lệnh gọi request)
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logOut: builder.query({
      query: () => "/user/logout",
    }),
  }),
});
export const { useLoginMutation, useLogOutQuery } = api;
