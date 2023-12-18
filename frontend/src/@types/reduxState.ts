import { TAddress } from "./address";
import { TBanner } from "./banner";
import { TCart } from "./cart";
import { TCategory } from "./category";
import { TOrder } from "./order";
import { TPermission } from "./permission";
import { TProduct } from "./product";
import { TSetting } from "./setting";
import { TSize } from "./size";
import { TUser } from "./user";

export type ProductState = {
  data: TProduct | null;
  isLoading: boolean;
  error: string | null;
};

export type ProductsState = {
  data: TProduct[];
  totalPages: number;
  totalProducts: number;
  isLoading: boolean;
  error: string | null;
};

export type CategoriesState = {
  data: TCategory[];
  isLoading: boolean;
  error: string | null;
};

export type CategoryState = {
  data: TCategory | null;
  isLoading: boolean;
  error: string | null;
};

export type AddressesState = {
  data: TAddress[];
  isLoading: boolean;
  error: string | null;
};

export type AddressState = {
  data: TAddress | null;
  isLoading: boolean;
  error: string | null;
};

export type SizesState = {
  data: TSize[];
  isLoading: boolean;
  error: string | null;
};

export type SizeState = {
  data: TSize | null;
  isLoading: boolean;
  error: string | null;
};
export type BannersState = {
  data: TBanner[];
  isLoading: boolean;
  error: string | null;
};

export type BannerState = {
  data: TBanner | null;
  isLoading: boolean;
  error: string | null;
};

export type AuthState = {
  user: TUser | null;
  error: string | null;
  isLoading: boolean;
  access_token: string | null;
  refresh_token: string | null;
};

export type CartState = {
  items: TCart[];
  totalPrice: number;
  totalQuantity: number;
  shippingId: number | null;
  isLoading: boolean;
  error: string | null;
};

export type OrderState = {
  data: TOrder[];
  order?: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

export type UserStates = {
  data: TUser[];
  isLoading: boolean;
  error: string | null;
};

export type PermissionStates = {
  data: TPermission[];
  isLoading: boolean;
  error: string | null;
};

export type SettingStates = {
  data: TSetting | null;
  isLoading: boolean;
  error: string | null;
};
