import { ROLE } from "../../constants/roles";

export default [
  {
    _id: "6557d2530fe86fe5c201e7d5",
    email: "admin@admin.com",
    password: "12345678",
    firstName: "admin",
    lastName: "admin",
    role: ROLE.ADMIN,
    phoneNumber: "9812345678",
    avatar: "https://images.com/admin.png",
    permission: [{ _id: "1", name: "PRODUCTS_CREATE" }],
  },
];
