import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// axios
import { AxiosError } from "axios";
import axiosInstance from "../../../utils/AxiosInstance";

// types
import { SizeInputs, TSize } from "../../../@types/size";
import { SizesState } from "../../../@types/reduxState";

// helpers
import { showApiErrorToastr, showCustomToastr } from "../../../utils/helper";

// initial states
const initialState: SizesState = {
  data: [],
  isLoading: false,
  error: null,
};

// slice
const adminSizeSlice = createSlice({
  name: "adminSize",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdminSizes.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchAdminSizes.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    });
    builder.addCase(fetchAdminSizes.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(addNewSize.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(addNewSize.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: [action.payload, ...state.data],
      };
    });
    builder.addCase(addNewSize.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(updateAdminSize.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      updateAdminSize.fulfilled,
      (state, action: PayloadAction<TSize>) => {
        const sizeIndex = state.data.findIndex(
          (c) => c._id === action.payload._id
        );
        if (sizeIndex !== -1) {
          state.data[sizeIndex] = action.payload;
        }
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(updateAdminSize.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(deleteAdminSize.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(deleteAdminSize.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: state.data.filter((cat) => cat._id !== action.payload),
      };
    });
    builder.addCase(deleteAdminSize.rejected, (state, action) => {
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
export const fetchAdminSizes = createAsyncThunk("fetchAdminSizes", async () => {
  try {
    const result = await axiosInstance.get(`/sizes`);
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    showApiErrorToastr(error);
    throw error;
  }
});

export const addNewSize = createAsyncThunk(
  "addNewSize",
  async (data: SizeInputs) => {
    try {
      const response = await axiosInstance.post(`/sizes`, data);
      showCustomToastr("Size created successfully.", "success");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const updateAdminSize = createAsyncThunk(
  "updateAdminSize",
  async ({ id, data }: { id: string; data: SizeInputs }) => {
    try {
      const response = await axiosInstance.put(`/sizes/${id}`, data);
      showCustomToastr("Size updated successfully.", "success");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const deleteAdminSize = createAsyncThunk(
  "deleteAdminSize",
  async ({ id }: { id: string }) => {
    try {
      await axiosInstance.delete(`/sizes/${id}`);
      showCustomToastr("Size removed successfully.", "success");
      return id;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export default adminSizeSlice.reducer;
