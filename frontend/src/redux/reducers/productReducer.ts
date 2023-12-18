import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// axios
import axiosInstance from "../../utils/AxiosInstance";
import { AxiosError } from "axios";

// types
import { ProductState } from "../../@types/reduxState";

// initial state
const initialState: ProductState = {
  data: null,
  isLoading: false,
  error: null,
};

// slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });
  },
});

// ==============================================
// API Calls
// ==============================================
export const fetchProductById = createAsyncThunk(
  "fetchProductById",
  async ({ id }: { id: string | undefined }) => {
    try {
      const result = await axiosInstance.get(`/products/${id}`);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export default productSlice.reducer;
