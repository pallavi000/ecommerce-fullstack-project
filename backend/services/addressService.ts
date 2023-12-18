import mongoose, { Types } from "mongoose";

//model
import { Address } from "../models/Address";

//type
import { TAddressSchema } from "../types/address";

async function findAll(user: string) {
  return await Address.find({ user: user }).lean().exec();
}

async function findOne(addressId: string | Types.ObjectId) {
  const category = await Address.findById(addressId);
  return category;
}

async function createOne(address: TAddressSchema) {
  const newCategory = new Address(address);
  return await newCategory.save();
}

async function updateAddress(
  addressId: string | Types.ObjectId,
  address: TAddressSchema
) {
  const updatedAddress = await Address.findByIdAndUpdate(addressId, address, {
    new: true,
  });
  return updatedAddress;
}

async function makeAddressDefault(
  addressId: string | Types.ObjectId,
  userId: string | Types.ObjectId
) {
  // remove current default address
  await Address.findOneAndUpdate(
    { isDefault: true },
    {
      isDefault: false,
    }
  );
  // make new address default
  const updatedAddress = await Address.findOneAndUpdate(
    { _id: addressId, user: userId },
    {
      isDefault: true,
    },
    {
      new: true,
    }
  );
  return updatedAddress;
}

async function deleteAddress(addressId: string | Types.ObjectId) {
  const address = await Address.findByIdAndDelete(addressId);
  return address;
}

export default {
  findOne,
  findAll,
  createOne,
  updateAddress,
  deleteAddress,
  makeAddressDefault,
};
