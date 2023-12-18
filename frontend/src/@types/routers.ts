import React from "react";
import { TUser, TUserRole } from "./user";

type Keys =
  | "HOME"
  | "SIGN_IN"
  | "REGISTER"
  | "PRODUCTS"
  | "PRODUCT_DETAIL"
  | "CATEGORY_PRODUCTS"
  | "SEARCH"
  | "CART"
  | "CHECKOUT"
  | "ACCOUNT_PAGE"
  | "ORDER_DETAIL"
  | "ORDER_SUCCESS"
  | "ADMIN_DASHBOARD"
  | "ADMIN_USERS"
  | "ADMIN_CATEGORIES"
  | "ADMIN_PRODUCTS"
  | "ADMIN_ORDERS"
  | "ADMIN_PROFILE"
  | "ADMIN_SIZES"
  | "ADMIN_PERMISSIONS"
  | "ADMIN_BANNERS"
  | "ADMIN_SETTINGS"
  | "NOT_FOUND";

type Path =
  | "/"
  | "/sign-in"
  | "/register"
  | "/products"
  | "/product-detail/:id"
  | "/search"
  | "/category/:id/products"
  | "/cart"
  | "/checkout"
  | "/account/:page?"
  | "/orders/:orderId"
  | "/order-success/:orderId"
  | "/admin/dashboard"
  | "/admin/users"
  | "/admin/products"
  | "/admin/categories"
  | "/admin/orders"
  | "/admin/profile"
  | "/admin/sizes"
  | "/admin/permissions"
  | "/admin/banners"
  | "/admin/settings"
  | "*";

export type TROUTES = {
  [key in Keys]: Path;
};

export type Routers = {
  path: Path;
  Component: React.FC;
  role: "public" | TUserRole;
};

export type TRouteProps = {
  Component: React.FC;
  userRole: "public" | TUserRole | null;
};
