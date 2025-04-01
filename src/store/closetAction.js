import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { closetDataApi } from "../constant";

const generateUniqueKey = (() => {
  const keys = new Set();

  return () => {
    let key;
    do {
      key = Math.floor(100000000 + Math.random() * 900000000).toString();
    } while (keys.has(key));
    keys.add(key);
    return key;
  };
})();

export const fetchData = createAsyncThunk(
  "api/fetchData",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${closetDataApi}?page=${page}`);
      const dataWithKeys = response.data.map((item) => ({
        ...item,
        uniqueKey: generateUniqueKey(),
      }));
      return { data: dataWithKeys, page };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
