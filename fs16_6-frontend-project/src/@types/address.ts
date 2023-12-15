import { TUser } from "./user";

export type TAddress = {
  _id: string;
  fullname: string;
  country: string;
  city: string;
  street: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
  user: TUser;
  createdAt?: string;
  updatedAt?: string;
};

export type TAddressInput = {
  fullname: string;
  country: string;
  city: string;
  street: string;
  zipCode: string;
  phone: string;
};

export type TAddressInputData = TAddressInput & { user: string };
