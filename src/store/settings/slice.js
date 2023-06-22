import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    signatureMinute: null
  },
  reducers: {
    setState(state, action) {
      state[action.payload.name] = action.payload.value;
    },
  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice;