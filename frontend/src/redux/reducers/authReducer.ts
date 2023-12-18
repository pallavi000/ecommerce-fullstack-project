import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

// App state
import { AppState } from "../store";

// axios
import { AxiosError } from "axios";
import axiosInstance from "../../utils/AxiosInstance";

// helper
import { showApiErrorToastr, showCustomToastr } from "../../utils/helper";
import { authPersistConfig } from "../../utils/reduxPersistConfig";

// types
import { AuthState } from "../../@types/reduxState";
import {
  RegisterInputs,
  TAvatarInputs,
  TUpdatePasswordInput,
  TUser,
  UpdateProfileInputs,
} from "../../@types/user";

// initial states
const initialState: AuthState = {
  user: null,
  error: null,
  isLoading: false,
  access_token: null,
  refresh_token: null,
};

// slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      return {
        ...state,
        access_token: null,
        refresh_token: null,
        user: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        access_token: action.payload.accessToken,
        refresh_token: action.payload.refreshToken,
        error: null,
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(registerUser.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(getCurrentUser.pending, (state, action) => {
      return {
        ...state,

        isLoading: true,
        error: null,
      };
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      return {
        ...state,

        user: action.payload,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      return {
        ...state,
        access_token: null,
        refresh_token: null,

        isLoading: false,
        error: null,
      };
    });
    builder.addCase(changePassword.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(updateProfile.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });
    builder.addCase(updateAvatar.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      const updatedUser = { ...state.user, avatar: action.payload } as TUser;
      return {
        ...state,
        user: updatedUser,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(updateAvatar.rejected, (state, action) => {
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
export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const result = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      showCustomToastr("Login successfull.", "success");
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const loginUserGoogle = createAsyncThunk(
  "loginUser",
  async (data: any) => {
    try {
      const result = await axiosInstance.post("/auth/login/google", data);
      showCustomToastr("Login successfull.", "success");
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser",
  async (data: RegisterInputs) => {
    try {
      const result = await axiosInstance.post("/auth/register", data);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "getCurrentUser",
  async (_, { getState }) => {
    try {
      const state = getState() as AppState;
      const accessToken = state.auth.access_token;
      if (!accessToken) {
        throw new Error("No access token available");
      }
      const result = await axiosInstance.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { password, ...userData } = result.data;
      return userData;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async (data: TUpdatePasswordInput) => {
    try {
      const result = await axiosInstance.put("/auth/change-password", data);
      showCustomToastr("Password has been updated.", "success");
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (data: UpdateProfileInputs) => {
    try {
      const result = await axiosInstance.put("/auth/update-profile", data);
      showCustomToastr("Password has been updated.", "success");
      return result.data;
    } catch (error) {}
  }
);

export const updateAvatar = createAsyncThunk(
  "updateAvatar",
  async (data: FormData) => {
    try {
      const result = await axiosInstance.put("/auth/avatar", data);
      showCustomToastr("Avatar has been updated.", "success");
      return result.data;
    } catch (error) {}
  }
);

export const { logoutUser } = authSlice.actions;
export default persistReducer(authPersistConfig, authSlice.reducer);
