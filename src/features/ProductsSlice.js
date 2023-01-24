import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
  error: null,
};

export const productsDetails = createAsyncThunk(
  "products/productsDetails",
  async (id = null, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8000/products");
      return res?.data;
    } catch (error) {
      return rejectWithValue("an error occur");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: {
    [productsDetails.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsDetails.fulfilled]: (state, action) => {
      state.status = "sucess";
      state.items = action.payload;
    },
    [productsDetails.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;
