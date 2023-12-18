import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// axios
import { AxiosError } from "axios";
import axiosInstance from "../../../utils/AxiosInstance";

// types
import { CategoriesState } from "../../../@types/reduxState";
import { TCategory, TCategoryInputs } from "../../../@types/category";

// helpers
import { showApiErrorToastr, showCustomToastr } from "../../../utils/helper";

// initial states
const initialState: CategoriesState = {
  data: [],
  isLoading: false,
  error: null,
};

// slice
const adminCategorySlice = createSlice({
  name: "adminCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdminCategories.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchAdminCategories.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    });
    builder.addCase(fetchAdminCategories.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(addNewCategory.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(addNewCategory.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: [action.payload, ...state.data],
      };
    });
    builder.addCase(addNewCategory.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(updateAdminCategory.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      updateAdminCategory.fulfilled,
      (state, action: PayloadAction<TCategory>) => {
        const categoryIndex = state.data.findIndex(
          (c) => c._id === action.payload._id
        );
        if (categoryIndex !== -1) {
          state.data[categoryIndex] = action.payload;
        }
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(updateAdminCategory.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(deleteAdminCategory.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(deleteAdminCategory.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: state.data.filter((cat) => cat._id !== action.payload),
      };
    });
    builder.addCase(deleteAdminCategory.rejected, (state, action) => {
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
export const fetchAdminCategories = createAsyncThunk(
  "fetchAdminCategories",
  async () => {
    try {
      const result = await axiosInstance.get(`/categories`);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const addNewCategory = createAsyncThunk(
  "addNewCategory",
  async (data: TCategoryInputs) => {
    try {
      const response = await axiosInstance.post(`/categories`, data);
      showCustomToastr("Category created successfully.", "success");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const updateAdminCategory = createAsyncThunk(
  "updateAdminCategory",
  async ({ id, data }: { id: string; data: TCategoryInputs }) => {
    try {
      const response = await axiosInstance.put(`/categories/${id}`, data);
      showCustomToastr("Category updated successfully.", "success");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const deleteAdminCategory = createAsyncThunk(
  "deleteAdminCategory",
  async ({ id }: { id: string }) => {
    try {
      await axiosInstance.delete(`/categories/${id}`);
      showCustomToastr("Category removed successfully.", "success");
      return id;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export default adminCategorySlice.reducer;
