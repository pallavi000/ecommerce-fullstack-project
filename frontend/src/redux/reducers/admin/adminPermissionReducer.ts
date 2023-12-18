import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// axios
import { AxiosError } from "axios";
import axiosInstance from "../../../utils/AxiosInstance";

// types
import { PermissionStates } from "../../../@types/reduxState";
import { IPermissionInputData, TPermission } from "../../../@types/permission";

// helpers
import { showApiErrorToastr, showCustomToastr } from "../../../utils/helper";

// initial states
const initialState: PermissionStates = {
  data: [],
  isLoading: false,
  error: null,
};

// slice
const adminPermissionSlice = createSlice({
  name: "adminPermission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPermissions.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchPermissions.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    });
    builder.addCase(fetchPermissions.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(addNewPermission.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(addNewPermission.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: [action.payload, ...state.data],
      };
    });
    builder.addCase(addNewPermission.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(updatePermission.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      updatePermission.fulfilled,
      (state, action: PayloadAction<TPermission>) => {
        const permissionIndex = state.data.findIndex(
          (p) => p._id === action.payload._id
        );
        if (permissionIndex !== -1) {
          state.data[permissionIndex] = action.payload;
        }
        state.isLoading = false;
        state.error = null;
        return state;
      }
    );
    builder.addCase(updatePermission.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(deletePermission.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(deletePermission.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: state.data.filter((p) => p._id !== action.payload),
      };
    });
    builder.addCase(deletePermission.rejected, (state, action) => {
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
export const fetchPermissions = createAsyncThunk(
  "fetchPermissions",
  async () => {
    try {
      const result = await axiosInstance.get(`/users/permissions`);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const addNewPermission = createAsyncThunk(
  "addNewPermission",
  async (data: IPermissionInputData) => {
    try {
      const response = await axiosInstance.post(`/users/permissions`, data);
      showCustomToastr("Permission created successfully.", "success");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const updatePermission = createAsyncThunk(
  "updatePermission",
  async ({ id, data }: { id: string; data: IPermissionInputData }) => {
    try {
      const response = await axiosInstance.put(
        `/users/permissions/${id}`,
        data
      );
      showCustomToastr("Permission updated successfully.", "success");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const deletePermission = createAsyncThunk(
  "deletePermission",
  async ({ id }: { id: string }) => {
    try {
      await axiosInstance.delete(`/users/permissions/${id}`);
      showCustomToastr("Permission removed successfully.", "success");
      return id;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export default adminPermissionSlice.reducer;
