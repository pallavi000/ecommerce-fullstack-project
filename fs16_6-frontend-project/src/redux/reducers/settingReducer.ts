import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// types
import { SettingStates } from "../../@types/reduxState";
import { TSetting, TSettingInputs } from "../../@types/setting";

//axios
import { AxiosError } from "axios";
import axiosInstance from "../../utils/AxiosInstance";

//helpers
import { showApiErrorToastr } from "../../utils/helper";

// initial states
const initialState: SettingStates = {
  data: null,
  isLoading: false,
  error: null,
};

// slice
const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getWebsiteSetting.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    });
    builder.addCase(
      getWebsiteSetting.fulfilled,
      (state, action: PayloadAction<TSetting>) => {
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          error: null,
        };
      }
    );
    builder.addCase(getWebsiteSetting.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(updateWebsietSetting.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    });
    builder.addCase(
      updateWebsietSetting.fulfilled,
      (state, action: PayloadAction<TSetting>) => {
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          error: null,
        };
      }
    );
    builder.addCase(updateWebsietSetting.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });
  },
});

export const getWebsiteSetting = createAsyncThunk(
  "getWebsiteSetting",
  async () => {
    try {
      const result = await axiosInstance.get("/settings");
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const createWebsiteSetting = createAsyncThunk(
  "updateWebsietSetting",
  async (data: TSettingInputs) => {
    try {
      const result = await axiosInstance.post("/settings", data);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const updateWebsietSetting = createAsyncThunk(
  "updateWebsietSetting",
  async ({ settingId, data }: { settingId: string; data: TSettingInputs }) => {
    try {
      const response = await axiosInstance.put(`/settings/${settingId}`, data);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export default settingSlice.reducer;
