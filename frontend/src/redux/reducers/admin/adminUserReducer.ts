import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// axios
import { AxiosError } from "axios";
import axiosInstance from "../../../utils/AxiosInstance";

// types
import { UserStates } from "../../../@types/reduxState";
import {
  RegisterInputs,
  TUser,
  TUserEditInput,
  UpdateUserInputs,
  UpdateProfileInputs,
} from "../../../@types/user";

// helpers
import { showApiErrorToastr, showCustomToastr } from "../../../utils/helper";

// initial states
const initialState: UserStates = {
  data: [],
  isLoading: false,
  error: null,
};

// slice
const adminUserSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(addNewUser.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: [action.payload, ...state.data],
      };
    });
    builder.addCase(addNewUser.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(updateUser.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        const userIndex = state.data.findIndex(
          (c) => c._id === action.payload._id
        );
        if (userIndex !== -1) {
          state.data[userIndex] = action.payload;
        }
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(updateUser.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(deleteUser.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: state.data.filter((user) => user._id !== action.payload),
      };
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
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
export const addNewUser = createAsyncThunk(
  "addNewUser",
  async (data: RegisterInputs) => {
    try {
      const result = await axiosInstance.post(`/users`, data);
      showCustomToastr("User created successfully.", "success");
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  try {
    const result = await axiosInstance.get(`/users`);
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    showApiErrorToastr(error);
    throw error;
  }
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ id, data }: { id: string; data: UpdateUserInputs }) => {
    try {
      const result = await axiosInstance.put(`/users/${id}`, data);
      showCustomToastr("User updated successfully.", "success");
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async ({ id }: { id: string }) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      showCustomToastr("User deleted successfully.", "success");
      return id;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export default adminUserSlice.reducer;
