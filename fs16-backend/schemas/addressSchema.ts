import { z } from "zod";

// schema
export const AddressSchema = z.strictObject({
  fullname: z.string({
    required_error: "Full Name is required",
  }),
  country: z.string({
    required_error: "Country is required",
  }),
  city: z.string({
    required_error: "City is required",
  }),
  street: z.string({
    required_error: "Street is required",
  }),
  zipCode: z.string({
    required_error: "Zip code is required",
  }),
  phone: z.string({
    required_error: "Phone is required",
  }),
  isDefault: z.boolean().optional(),
  user: z.string({
    required_error: "User ID is required",
  }),
});
