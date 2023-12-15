import axios, { AxiosError } from "axios";
import { VariantType, enqueueSnackbar } from "notistack";

export const getNowDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}/${month}/${year}`;
};

export const getOrderDate = () => {
  return getNowDate();
};

export const getOrderId = () => {
  const min = 100000;
  const max = 999999;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
};

export const valueToText = (value: number) => {
  return `$${value}`;
};

export const showApiErrorToastr = (error: Error | AxiosError) => {
  enqueueSnackbar(
    axios.isAxiosError(error) && error.response?.data?.message
      ? error.response?.data?.message
      : error.message,
    {
      variant: "error",
    }
  );
};

export const showCustomToastr = (message: string, variant: VariantType) => {
  enqueueSnackbar(message, { variant });
};
