import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui/slice';
import taskSlice from './tasks/slice';
import authSlice from './auth/slice';
import alertSlice from './alerts/slice';
import attendanceSlice from './attendance/slice';
import settingsSlice from './settings/slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    tasks: taskSlice.reducer,
    auth: authSlice.reducer,
    alerts: alertSlice.reducer,
    attendance: attendanceSlice.reducer,
    settings: settingsSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});
export default store;