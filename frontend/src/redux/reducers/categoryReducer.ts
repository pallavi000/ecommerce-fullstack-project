import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// types
import { CategoryState } from "../../@types/reduxState";
import { TCategory } from "../../@types/category";

// initial states
const initialState: CategoryState = {
  data: null,
  isLoading: false,
  error: null,
};

// slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<TCategory>) => {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  extraReducers: (builder) => {},
});

// ==============================================
// API Calls
// ==============================================

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
