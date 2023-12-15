import { TAddress } from "./address";
import { TCart } from "./cart";
import { TProduct } from "./product";
import { TUser } from "./user";

export type TPaymentMethod = "Credit Card" | "PayPal" | "Cash";
export type TPaymentStatus = "Paid" | "Pending" | "Refunded" | "Cancelled";

export type TOrderInput = {
  orderId: string;
  total: number;
  orderDate: string;
  paymentMethod: string;
  items: TCart[];
  deliveryStatus: string;
};

export type TOrderData = {
  cart: string[];
  shipping: string;
  billing: string;
  payment: {
    method: TPaymentMethod;
    status: TPaymentStatus;
  };
  total: number;
};

export type TOrder = {
  _id: string;
  user: TUser;
  products: TProduct[];
  shipping: {
    address: TAddress;
  };
  billing: {
    address: TAddress;
  };
  payment: {
    method: TPaymentMethod;
    status: TPaymentStatus;
  };
  total: number;
  createdAt?: string;
  updatedAt?: string;
};

export type TPaymentMethodData = {
  method: TPaymentMethod;
  status: TPaymentStatus;
};
