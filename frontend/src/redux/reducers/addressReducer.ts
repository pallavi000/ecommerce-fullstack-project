import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// axios
import { AxiosError } from "axios";
import axiosInstance from "../../utils/AxiosInstance";

// types
import { AddressesState } from "../../@types/reduxState";

// helpers
import { showApiErrorToastr, showCustomToastr } from "../../utils/helper";
import { TAddress, TAddressInputData } from "../../@types/address";

// initial states
const initialState: AddressesState = {
  data: [],
  isLoading: false,
  error: null,
};

// slice
const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserAddress.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchUserAddress.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    });
    builder.addCase(fetchUserAddress.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(addNewAddress.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(addNewAddress.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: [action.payload, ...state.data],
      };
    });
    builder.addCase(addNewAddress.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(updateAddress.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      updateAddress.fulfilled,
      (state, action: PayloadAction<TAddress>) => {
        const addressIndex = state.data.findIndex(
          (data) => data._id === action.payload._id
        );
        if (addressIndex !== -1) {
          state.data[addressIndex] = action.payload;
        }
        state.error = null;
        state.isLoading = false;
        return state;
      }
    );
    builder.addCase(updateAddress.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(makeAddressDefault.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      makeAddressDefault.fulfilled,
      (state, action: PayloadAction<TAddress>) => {
        // mark current default to false
        state.data = state.data.map((data) => ({ ...data, isDefault: false }));
        // update new default address
        const addressIndex = state.data.findIndex(
          (data) => data._id === action.payload._id
        );
        if (addressIndex !== -1) {
          state.data[addressIndex] = action.payload;
        }

        state.error = null;
        state.isLoading = false;
        return state;
      }
    );
    builder.addCase(makeAddressDefault.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(deleteAddress.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      deleteAddress.fulfilled,
      (state, action: PayloadAction<string>) => {
        return {
          ...state,
          isLoading: false,
          error: null,
          data: state.data.filter((data) => data._id !== action.payload),
        };
      }
    );
    builder.addCase(deleteAddress.rejected, (state, action) => {
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
export const fetchUserAddress = createAsyncThunk(
  "fetchUserAddress",
  async () => {
    try {
      const result = await axiosInstance.get(`/addresses`);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const addNewAddress = createAsyncThunk(
  "addNewAddress",
  async (data: TAddressInputData) => {
    try {
      const response = await axiosInstance.post(`/addresses`, data);
      showCustomToastr("Address created successfully.", "success");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const updateAddress = createAsyncThunk(
  "updateAddress",
  async ({
    addressId,
    data,
  }: {
    addressId: string;
    data: TAddressInputData;
  }) => {
    try {
      const response = await axiosInstance.put(`/addresses/${addressId}`, data);
      showCustomToastr("Address updated successfully.", "success");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const makeAddressDefault = createAsyncThunk(
  "makeAddressDefault",
  async (addressId: string) => {
    try {
      const response = await axiosInstance.put(
        `/addresses/make-default/${addressId}`
      );
      showCustomToastr("Address updated successfully.", "success");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "deleteAddress",
  async (addressId: string) => {
    try {
      await axiosInstance.delete(`/addresses/${addressId}`);
      showCustomToastr("Address deleted successfully.", "success");
      return addressId;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export default addressSlice.reducer;
