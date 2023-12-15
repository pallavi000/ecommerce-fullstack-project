import { rest } from "msw";
import { setupServer } from "msw/node";

//types
import { TCategoryInputs } from "../@types/category";

//data
import { categoryData } from "../test/testData/categoryData";

export const categoriesHandlers = [
  rest.get("https://api.escuelajs.co/api/v1/categories", (req, res, ctx) => {
    return res(ctx.json(categoryData));
  }),

  // fetch products by category id

  rest.post(
    "https://api.escuelajs.co/api/v1/categories",
    async (req, res, ctx) => {
      let data: TCategoryInputs | {} = {};
      await req.json().then((res) => (data = res));
      return res(ctx.json({ data }));
    }
  ),

  rest.put(
    "https://api.escuelajs.co/api/v1/categories/:id",
    async (req, res, ctx) => {
      const { id } = req.params;
      const findIndex = categoryData.findIndex((c) => c._id === id);
      if (findIndex !== -1) {
        const data = await req.json();
        const updatedProduct = { ...categoryData[findIndex], ...data };
        return res(ctx.json(updatedProduct));
      }
    }
  ),

  rest.delete(
    "https://api.escuelajs.co/api/v1/categories/:id",
    async (req, res, ctx) => {
      const { id } = req.params;
      const findIndex = categoryData.findIndex((c) => c._id === id);
      if (findIndex !== -1) {
        return res(ctx.json(id));
      }
      return res(ctx.json(0));
    }
  ),
];

const categoriesServer = setupServer(...categoriesHandlers);

export default categoriesServer;
