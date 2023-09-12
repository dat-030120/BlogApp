import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { fullname: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { fullname, token } = action.payload;
      state.fullname = fullname;
      state.token = token;
    },
    logOut: (state, action) => {
      state.fullname = null;
      state.token = null;
    },
  },
});
export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectFullname = (state) => state.auth.fullname;
export const selectToken = (state) => state.auth.token;
