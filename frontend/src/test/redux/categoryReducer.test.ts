import {
  addNewCategory,
  deleteAdminCategory,
  fetchAdminCategories,
  updateAdminCategory,
} from "../../redux/reducers/admin/adminCategoryReducer";
import store from "../../redux/store";
import categoriesServer from "../../server/categoryServer";
import { categoryData } from "../testData/categoryData";

beforeAll(() => categoriesServer.listen());

afterEach(() => categoriesServer.resetHandlers());

afterAll(() => categoriesServer.close());

describe("categories reducer", () => {
  test("should fetch all categories", async () => {
    await store.dispatch(fetchAdminCategories());
    expect(store.getState().adminCategories.data.length).toBe(3);
  });
});

describe("Category reducer: DELETE, PUT, POST", () => {
  test("should add new categories", async () => {
    const res = await store.dispatch(
      addNewCategory({
        name: "newcat",
        image: "https://i.imgur.com/OLKMwgP.jpeg",
      })
    );
    expect(res.meta.arg).toMatchObject({
      name: "newcat",
      image: "https://i.imgur.com/OLKMwgP.jpeg",
    });
  });

  test("should update category by id", async () => {
    const res = store.dispatch(
      updateAdminCategory({ id: categoryData[0]._id, data: categoryData[0] })
    );
    expect(res.arg).toMatchObject(categoryData[0]);
  });

  test("should delete product by id", async () => {
    const res = store.dispatch(deleteAdminCategory({ id: "1" }));
    expect(res.arg.id).toBe(1);
  });
});
