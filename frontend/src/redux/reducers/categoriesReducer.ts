import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// axios
import axiosInstance from "../../utils/AxiosInstance";
import { AxiosError } from "axios";

// types
import { CategoriesState } from "../../@types/reduxState";

// initial states
const initialState: CategoriesState = {
  data: [],
  isLoading: false,
  error: null,
};

// slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    });
  },
});

// ==============================================
// API Calls
// ==============================================
export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  try {
    const result = await axiosInstance.get(`/categories`);
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    throw error;
  }
});

export default categoriesSlice.reducer;
