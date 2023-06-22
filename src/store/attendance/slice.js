import { createSlice } from "@reduxjs/toolkit";

const attendanceSlice = createSlice({
    name: "attendance",
    initialState: {
        staffList: [],
    },
    reducers: {
        setState(state, action) {
            state[action.payload.name] = action.payload.value;
        },
    },
});

export const attendanceActions = attendanceSlice.actions;

export default attendanceSlice;