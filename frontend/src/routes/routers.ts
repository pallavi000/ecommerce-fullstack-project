// Pages
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import SignIn from "../pages/SignIn";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Account from "../pages/Account";
import CategoryProducts from "../pages/CategoryProducts";
import Register from "../pages/Register";
import Products from "../pages/Products";
import SearchResult from "../pages/SearchResult";
import OrderSuccess from "../pages/OrderSuccess";
import Dashboard from "../pages/admin/Dashboard";
import NotFound from "../pages/NotFound";

// Admin Pages
import AdminUsers from "../pages/admin/AdminUsers";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminProfile from "../pages/admin/AdminProfile";
import AdminSizes from "../pages/admin/AdminSizes";
import AdminBanners from "../pages/admin/AdminBanners";
import AdminPermissions from "../pages/admin/AdminPermissions";

// types
import { Routers, TROUTES } from "../@types/routers";
import AdminSettings from "../pages/admin/AdminSettings";
import OrderDetail from "../pages/OrderDetail";

// routes
export const ROUTES: TROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  REGISTER: "/register",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/product-detail/:id",
  CATEGORY_PRODUCTS: "/category/:id/products",
  SEARCH: "/search",
  CART: "/cart",
  CHECKOUT: "/checkout",
  ACCOUNT_PAGE: "/account/:page?",
  ORDER_DETAIL: "/orders/:orderId",
  ORDER_SUCCESS: "/order-success/:orderId",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USERS: "/admin/users",
  ADMIN_CATEGORIES: "/admin/categories",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_ORDERS: "/admin/orders",
  ADMIN_PROFILE: "/admin/profile",
  ADMIN_SIZES: "/admin/sizes",
  ADMIN_PERMISSIONS: "/admin/permissions",
  ADMIN_BANNERS: "/admin/banners",
  ADMIN_SETTINGS: "/admin/settings",
  NOT_FOUND: "*",
};

// routers
export const routers: Routers[] = [
  { path: ROUTES.HOME, Component: Home, role: "public" },
  { path: ROUTES.SIGN_IN, Component: SignIn, role: "public" },
  { path: ROUTES.REGISTER, Component: Register, role: "public" },
  { path: ROUTES.PRODUCTS, Component: Products, role: "public" },
  { path: ROUTES.PRODUCT_DETAIL, Component: ProductDetail, role: "public" },
  {
    path: ROUTES.CATEGORY_PRODUCTS,
    Component: CategoryProducts,
    role: "public",
  },
  { path: ROUTES.SEARCH, Component: SearchResult, role: "public" },
  { path: ROUTES.CART, Component: Cart, role: "USER" },
  { path: ROUTES.CHECKOUT, Component: Checkout, role: "USER" },
  { path: ROUTES.ACCOUNT_PAGE, Component: Account, role: "USER" },
  { path: ROUTES.ORDER_DETAIL, Component: OrderDetail, role: "USER" },
  {
    path: ROUTES.ORDER_SUCCESS,
    Component: OrderSuccess,
    role: "USER",
  },
  { path: ROUTES.ADMIN_DASHBOARD, Component: Dashboard, role: "ADMIN" },
  { path: ROUTES.ADMIN_USERS, Component: AdminUsers, role: "ADMIN" },
  { path: ROUTES.ADMIN_CATEGORIES, Component: AdminCategories, role: "ADMIN" },
  { path: ROUTES.ADMIN_PRODUCTS, Component: AdminProducts, role: "ADMIN" },
  { path: ROUTES.ADMIN_ORDERS, Component: AdminOrders, role: "ADMIN" },
  { path: ROUTES.ADMIN_PROFILE, Component: AdminProfile, role: "ADMIN" },
  { path: ROUTES.ADMIN_SIZES, Component: AdminSizes, role: "ADMIN" },
  { path: ROUTES.ADMIN_BANNERS, Component: AdminBanners, role: "ADMIN" },
  { path: ROUTES.ADMIN_SETTINGS, Component: AdminSettings, role: "ADMIN" },

  {
    path: ROUTES.ADMIN_PERMISSIONS,
    Component: AdminPermissions,
    role: "ADMIN",
  },
  { path: ROUTES.NOT_FOUND, Component: NotFound, role: "public" },
];
