import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    signature: null,
    csrfId: null,
    laravelSession: false,
    user: null,
  },
  reducers: {
    setInitialState(state, action) {
      if ("csrf" in action.payload) {
        state.csrfId = action.payload.csrf;
      }
      if (Object.hasOwn(action.payload, "isloggedin"))
        state.isLoggedIn = action.payload.isloggedin === "true";
    },
    setUser(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.user.permission = Number(action.payload.permission);
    },
    setLaravelSession(state, action) {
      state.laravelSession = true;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.user = null;
      state.laravelSession = false;
    },
    setSignature(state, action) {
      state.signature = action.payload.signature;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;