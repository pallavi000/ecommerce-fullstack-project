import { rest } from "msw";
import { setupServer } from "msw/node";

//data
import { userData } from "../test/testData/userData";

//types
import { RegisterInputs } from "../@types/user";

export const handlers = [
  rest.get("https://api.escuelajs.co/api/v1/users", async (req, res, ctx) => {
    return res(ctx.json(userData));
  }),

  rest.post("https://api.escuelajs.co/api/v1/users", async (req, res, ctx) => {
    let data: RegisterInputs | {} = {};
    await req.json().then((res) => (data = res));
    return res(ctx.json({ data }));
  }),

  rest.put(
    "https://api.escuelajs.co/api/v1/users/:id",
    async (req, res, ctx) => {
      const { id } = req.params;
      const findIndex = userData.findIndex((u) => u._id === id);
      if (findIndex !== -1) {
        const data = await req.json();
        const updatedUser = { ...userData[findIndex], ...data };
        return res(ctx.json(updatedUser));
      }
    }
  ),

  rest.delete(
    "https://api.escuelajs.co/api/v1/users/:id",
    async (req, res, ctx) => {
      const { id } = req.params;
      const findIndex = userData.findIndex((u) => u._id === id);
      if (findIndex !== -1) {
        return res(ctx.json(id));
      }
      return res(ctx.json(0));
    }
  ),

  rest.post(
    "https://api.escuelajs.co/api/v1/auth/login",
    async (req, res, ctx) => {
      const data = await req.json();
      return res(ctx.json(data));
    }
  ),
];

const usersServer = setupServer(...handlers);

export default usersServer;
