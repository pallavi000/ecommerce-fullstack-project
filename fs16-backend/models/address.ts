import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AddressSchema = new Schema(
  {
    fullname: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const Address = mongoose.model("Address", AddressSchema);
