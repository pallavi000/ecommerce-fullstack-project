import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// types
import { ProductsState } from "../../@types/reduxState";
import { TProductSortingOption } from "../../@types/product";

// axios
import { AxiosError } from "axios";
import axiosInstance from "../../utils/AxiosInstance";

// initial state
const initialState: ProductsState = {
  data: [],
  totalPages: 0,
  totalProducts: 0,
  isLoading: false,
  error: null,
};

// slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload.products,
        totalPages: action.payload.totalPages,
        totalProducts: action.payload.totalProducts,
      };
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
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
export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async ({
    pageNo,
    perPage,
    price_min,
    price_max,
    categoryId = null,
    sorting = "newest",
  }: {
    pageNo: number;
    perPage: number;
    price_min: number;
    price_max: number;
    categoryId?: string | null;
    sorting?: TProductSortingOption;
  }) => {
    try {
      const result = await axiosInstance.get(
        `/products?pageNo=${pageNo}&perPage=${perPage}&minPrice=${price_min}&maxPrice=${price_max}${
          categoryId && categoryId !== "0" ? "&categoryId=" + categoryId : ""
        }&sorting=${sorting}`
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const fetchSearchProducts = createAsyncThunk(
  "fetchProducts",
  async ({
    pageNo,
    perPage,
    query,
    price_min,
    price_max,
    categoryId,
    sorting = "newest",
  }: {
    pageNo: number;
    perPage: number;
    query: string;
    price_min: number;
    price_max: number;
    categoryId: string;
    sorting?: TProductSortingOption;
  }) => {
    try {
      const url = `/products/search/?title=${query}&price_min=${price_min}&price_max=${price_max}${
        categoryId && categoryId !== "0" ? "&categoryId=" + categoryId : ""
      }&pageNo=${pageNo}&perPage=${perPage}&sorting=${sorting}`;
      const result = await axiosInstance.get(url);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const {} = productsSlice.actions;

export default productsSlice.reducer;
