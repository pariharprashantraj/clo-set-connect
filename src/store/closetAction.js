import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { closetDataApi } from "../constant";

// Function to generate a unique 9-digit number
const generateUniqueKey = (() => {
  const keys = new Set(); // To track existing keys

  return () => {
    let key;
    do {
      // Generate a random 9-digit number
      key = Math.floor(100000000 + Math.random() * 900000000).toString();
    } while (keys.has(key)); // Ensure uniqueness
    keys.add(key); // Add the new key to the set
    return key; // Return the unique key
  };
})();

// Thunk to fetch API data with pagination
export const fetchData = createAsyncThunk(
  "api/fetchData",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${closetDataApi}?page=${page}`);
      // Map through the data to assign a unique key to each item
      const dataWithKeys = response.data.map((item) => ({
        ...item,
        uniqueKey: generateUniqueKey(), // Assign unique key
      }));
      return { data: dataWithKeys, page };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
