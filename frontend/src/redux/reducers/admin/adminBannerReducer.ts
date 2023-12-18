import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// axios
import { AxiosError } from "axios";
import axiosInstance from "../../../utils/AxiosInstance";

// types
import { BannerInputs, TBanner } from "../../../@types/banner";
import { BannersState } from "../../../@types/reduxState";

// helpers
import { showApiErrorToastr, showCustomToastr } from "../../../utils/helper";

// initial states
const initialState: BannersState = {
  data: [],
  isLoading: false,
  error: null,
};

// slice
const adminBannerSlice = createSlice({
  name: "adminBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdminBanners.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchAdminBanners.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    });
    builder.addCase(fetchAdminBanners.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(addNewBanner.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(addNewBanner.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: [action.payload, ...state.data],
      };
    });
    builder.addCase(addNewBanner.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(updateAdminBanner.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      updateAdminBanner.fulfilled,
      (state, action: PayloadAction<TBanner>) => {
        const bannerIndex = state.data.findIndex(
          (c: TBanner) => c._id === action.payload._id
        );
        if (bannerIndex !== -1) {
          state.data[bannerIndex] = action.payload;
        }
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(updateAdminBanner.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(deleteAdminBanner.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(deleteAdminBanner.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: state.data.filter((cat: TBanner) => cat._id !== action.payload),
      };
    });
    builder.addCase(deleteAdminBanner.rejected, (state, action) => {
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
export const fetchAdminBanners = createAsyncThunk(
  "fetchAdminBanners",
  async () => {
    try {
      const result = await axiosInstance.get(`/banners`);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const addNewBanner = createAsyncThunk(
  "addNewBanner",
  async (data: BannerInputs) => {
    try {
      const response = await axiosInstance.post(`/banners`, data);
      showCustomToastr("Banner created successfully.", "success");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const updateAdminBanner = createAsyncThunk(
  "updateAdminBanner",
  async (data: TBanner) => {
    try {
      const { _id, ...newData } = data;
      const response = await axiosInstance.put(`/banners/${_id}`, newData);
      showCustomToastr("Banner updated successfully.", "success");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const deleteAdminBanner = createAsyncThunk(
  "deleteAdminBanner",
  async ({ id }: { id: string }) => {
    try {
      await axiosInstance.delete(`/banners/${id}`);
      showCustomToastr("Banner removed successfully.", "success");
      return id;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export default adminBannerSlice.reducer;
