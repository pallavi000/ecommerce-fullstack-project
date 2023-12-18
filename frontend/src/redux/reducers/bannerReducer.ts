import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// types
import { BannersState } from "../../@types/reduxState";

//axios
import axiosInstance from "../../utils/AxiosInstance";
import { AxiosError } from "axios";

//helpers
import { showApiErrorToastr } from "../../utils/helper";

// initail state
const initialState: BannersState = {
  data: [],
  isLoading: false,
  error: null,
};

// slice
const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBanners.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    });
    builder.addCase(fetchBanners.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(fetchBanners.rejected, (state, action) => {
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
export const fetchBanners = createAsyncThunk("fetchBanners", async () => {
  try {
    const result = await axiosInstance.get(`/banners`);
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    showApiErrorToastr(error);
    throw error;
  }
});

// redux persist reducer
export default bannerSlice.reducer;
