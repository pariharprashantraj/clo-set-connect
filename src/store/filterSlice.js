import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    searchText: "",
    filterOptions: {
      paid: false,
      free: false,
      viewOnly: false,
    },
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    toggleFilterOption: (state, action) => {
      const option = action.payload;
      state.filterOptions[option] = !state.filterOptions[option]; // Toggle filter
    },
  },
});

export const { setSearchText, toggleFilterOption } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
