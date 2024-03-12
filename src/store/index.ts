import { configureStore } from "@reduxjs/toolkit";
import group from "./groups/slice";
import filters from "./filters/slice";
const store = configureStore({
  reducer: {
    group,
    filters,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
