import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../apis/authApi";
import { jobApi } from "../apis/jobApi";
import authReducer from "../features/auth/authSlice";
import filterReducer from "../features/filter/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    [authApi.reducerPath]: authApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, jobApi.middleware),
});
