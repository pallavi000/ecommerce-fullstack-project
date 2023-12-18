import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// types
import { ProductsState } from "../../@types/reduxState";
import { TProductSortingOption } from "../../@types/product";

// axios
import { AxiosError } from "axios";
import axiosInstance from "../../utils/AxiosInstance";
import { queryBuilder } from "../../utils/helper";

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
    sizeIds = [],
  }: {
    pageNo: number;
    perPage: number;
    price_min: number;
    price_max: number;
    categoryId?: string | null;
    sizeIds?: string[];
    sorting?: TProductSortingOption;
  }) => {
    try {
      // Convert the array of sizes to a query string
      const sizeQueryString = queryBuilder("size", sizeIds);
      const result = await axiosInstance.get(
        `/products?pageNo=${pageNo}&perPage=${perPage}&minPrice=${price_min}&maxPrice=${price_max}${
          categoryId && categoryId !== "0" ? "&categoryId=" + categoryId : ""
        }&sorting=${sorting}&${sizeQueryString}`
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
    sizeIds = [],
    sorting = "newest",
  }: {
    pageNo: number;
    perPage: number;
    query: string;
    price_min: number;
    price_max: number;
    categoryId: string;
    sizeIds: string[];
    sorting?: TProductSortingOption;
  }) => {
    try {
      // Convert the array of sizes to a query string
      const sizeQueryString = queryBuilder("size", sizeIds);
      const url = `/products/search/?title=${query}&price_min=${price_min}&price_max=${price_max}${
        categoryId && categoryId !== "0" ? "&categoryId=" + categoryId : ""
      }&pageNo=${pageNo}&perPage=${perPage}&sorting=${sorting}&${sizeQueryString}`;
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
