import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./closetAction";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  page: 1,
};

const closetDataSlice = createSlice({
  name: "apiData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...state.data, ...action.payload.data];
        state.page = action.payload.page;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const apiReducer = closetDataSlice.reducer;
