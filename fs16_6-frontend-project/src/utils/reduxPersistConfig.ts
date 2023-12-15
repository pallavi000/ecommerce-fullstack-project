import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["access_token", "refresh_token"],
};

export const cartPersistConfig = {
  key: "cart",
  storage: storage,
  whitelist: ["totalQuantity", "totalPrice", "items", "shippingId"],
};

export const orderPersistConfig = {
  key: "order",
  storage: storage,
  whitelist: ["data"],
};
