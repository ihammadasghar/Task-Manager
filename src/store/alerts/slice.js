import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alerts",
  initialState: {
    alert: {},
    lastAlertFetchDt: new Date(0),
  },
  reducers: {
    replaceAlert(state, action) {
      state.alert = action.payload;
      state.lastAlertFetchDt = new Date();
      console.log("Last Alert Fetch:", state.lastAlertFetchDt);
    }
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice;