import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import thunk from "redux-thunk";

// Reducers
import productsReducer from "./reducers/productsReducer";
import productReducer from "./reducers/productReducer";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import categoryReducer from "./reducers/categoryReducer";
import orderReducer from "./reducers/orderReducer";
import addressReducer from "./reducers/addressReducer";
import bannerReducer from "./reducers/bannerReducer";
import settingReducer from "./reducers/settingReducer";

// Admin Reducers
import adminUserReducer from "./reducers/admin/adminUserReducer";
import adminProductReducer from "./reducers/admin/adminProductReducer";
import adminCategoryReducer from "./reducers/admin/adminCategoryReducer";
import adminSizeReducer from "./reducers/admin/adminSizeReducer";
import adminPermissionReducer from "./reducers/admin/adminPermissionReducer";
import adminBannerReducer from "./reducers/admin/adminBannerReducer";

// Redux Store
const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    categories: categoriesReducer,
    category: categoryReducer,
    banner: bannerReducer,
    auth: authReducer,
    cart: cartReducer,
    orders: orderReducer,
    setting: settingReducer,
    addresses: addressReducer,
    adminUsers: adminUserReducer,
    adminProducts: adminProductReducer,
    adminCategories: adminCategoryReducer,
    adminSizes: adminSizeReducer,
    adminBanner: adminBannerReducer,
    adminPermissions: adminPermissionReducer,
  },
  middleware: (getDEfaultMiddleware) =>
    getDEfaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

// Redux Persistor
export const persistor = persistStore(store);

// App State
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// App Dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
