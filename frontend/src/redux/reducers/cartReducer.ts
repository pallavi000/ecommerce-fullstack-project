import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

// types
import { CartState } from "../../@types/reduxState";
import { TCart, TCartInput } from "../../@types/cart";

//axios
import axiosInstance from "../../utils/AxiosInstance";
import { AxiosError } from "axios";

//helpers
import { showApiErrorToastr, showCustomToastr } from "../../utils/helper";
import { cartPersistConfig } from "../../utils/reduxPersistConfig";

//get Total amount of cartItems
function calculateTotalPrice(items: TCart[]) {
  return items.reduce((accumulator, item) => {
    return accumulator + item.total;
  }, 0);
}

function calculateTotalQuantity(items: TCart[]) {
  return items.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);
}

// initial states
const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  shippingId: null,
  isLoading: false,
  error: null,
};

// slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart: (state) => {
      return {
        ...state,
        items: [],
        totalPrice: 0,
        totalQuantity: 0,
        shippingId: null,
        isLoading: false,
        error: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      addToCart.fulfilled,
      (state, action: PayloadAction<TCart>) => {
        const cartItems = [...state.items, action.payload];
        return {
          ...state,
          isLoading: false,
          error: null,
          items: cartItems,
          totalPrice: calculateTotalPrice(cartItems),
          totalQuantity: calculateTotalQuantity(cartItems),
        };
      }
    );
    builder.addCase(addToCart.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(getCartItems.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    });
    builder.addCase(
      getCartItems.fulfilled,
      (state, action: PayloadAction<TCart[]>) => {
        return {
          ...state,
          items: action.payload,
          isLoading: false,
          error: null,
          totalPrice: calculateTotalPrice(action.payload),
          totalQuantity: calculateTotalQuantity(action.payload),
        };
      }
    );
    builder.addCase(getCartItems.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(updateCartItem.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    });
    builder.addCase(
      updateCartItem.fulfilled,
      (state, action: PayloadAction<TCart>) => {
        const itemIndex = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (itemIndex !== -1) {
          state.items[itemIndex] = action.payload;
        }
        state.totalPrice = calculateTotalPrice(state.items);
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.isLoading = false;
        state.error = null;
        return state;
      }
    );
    builder.addCase(updateCartItem.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(removeFromCart.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    });
    builder.addCase(
      removeFromCart.fulfilled,
      (state, action: PayloadAction<string>) => {
        const cartItems = state.items.filter(
          (item) => item._id !== action.payload
        );
        return {
          ...state,
          items: cartItems,
          isLoading: false,
          error: null,
          totalPrice: calculateTotalPrice(cartItems),
          totalQuantity: calculateTotalQuantity(cartItems),
        };
      }
    );
    builder.addCase(removeFromCart.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });
  },
});

export const addToCart = createAsyncThunk(
  "addToCart",
  async (data: TCartInput) => {
    try {
      const response = await axiosInstance.post("/carts", data);
      showCustomToastr("Cart Added successfully.", "success");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const getCartItems = createAsyncThunk("getCartItems", async () => {
  try {
    const result = await axiosInstance.get("/carts");
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    throw error;
  }
});

export const updateCartItem = createAsyncThunk(
  "updateCartItem",
  async ({ cartId, data }: { cartId: string; data: any }) => {
    try {
      const response = await axiosInstance.put(`/carts/${cartId}`, data);
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "removeFromCart",
  async (itemId: string) => {
    try {
      await axiosInstance.delete(`/carts/${itemId}`);
      showCustomToastr("Item removed from the cart.", "success");
      return itemId;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

// actions
export const { emptyCart } = cartSlice.actions;
// redux persist reducer
export default persistReducer(cartPersistConfig, cartSlice.reducer);
