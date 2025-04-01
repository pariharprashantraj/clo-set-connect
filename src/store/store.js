import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { apiReducer } from "./closetDataSlice";
import { filterReducer } from "./filterSlice";

export const store = configureStore({
  reducer: {
    apiData: apiReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
