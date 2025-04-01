import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./closetAction";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  page: 1, // Track current page
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
        state.data = [...state.data, ...action.payload.data]; // Append new data
        state.page = action.payload.page; // Update page number
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const apiReducer = closetDataSlice.reducer;
