import { configureStore } from '@reduxjs/toolkit';
import { scheduleApi } from './services/scheduleServices.js';

const store = configureStore({
  reducer: {
    [scheduleApi.reducerPath]: scheduleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(scheduleApi.middleware),
  devTools: true,
});

export default store;
