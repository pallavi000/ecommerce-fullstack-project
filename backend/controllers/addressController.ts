import { NextFunction, Request, Response } from "express";

// services
import AddressService from "../services/addressService";

// error builder
import { ApiError } from "../errors/ApiError";

// types
import { TAddressSchema } from "../types/address";
import { IAuthorizationRequest } from "../types/authorization";

export async function findAllAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req as IAuthorizationRequest;

    const addresses = await AddressService.findAll(user._id);
    res.json(addresses);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function findSingleAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const addressId = req.params.addressId;
    const address = await AddressService.findOne(addressId);
    if (!address) {
      const notFoundError = ApiError.resourceNotFound("Address not found.");
      return next(notFoundError);
    }
    res.json(address);
  } catch (error) {
    const internalServerError = ApiError.internal("Internal server error.");
    next(internalServerError);
  }
}

export async function createAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newAddress: TAddressSchema = req.body;
    const address = await AddressService.createOne(newAddress);
    res.status(201).json(address);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function updateAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const addressId = req.params.addressId;
    const updateAddressData: TAddressSchema = req.body;
    const address = await AddressService.findOne(addressId);
    if (!address) {
      return next(ApiError.resourceNotFound("Address not found."));
    }
    const updatedAddress = await AddressService.updateAddress(
      addressId,
      updateAddressData
    );
    res.json(updatedAddress);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function makeAddressDefault(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const addressId = req.params.addressId;
    const { user } = req as IAuthorizationRequest;
    const address = await AddressService.findOne(addressId);
    if (!address) {
      return next(ApiError.resourceNotFound("Address not found."));
    }
    const updatedAddress = await AddressService.makeAddressDefault(
      addressId,
      user._id
    );
    res.json(updatedAddress);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function deleteAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const addressId = req.params.addressId;
    const address = await AddressService.findOne(addressId);
    if (!address) {
      next(ApiError.resourceNotFound("Address not found."));
      return;
    }
    await AddressService.deleteAddress(addressId);
    res.status(204).send();
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}
