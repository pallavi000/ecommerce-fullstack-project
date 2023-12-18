import { fetchProducts } from "../../redux/reducers/productsReducer";
import store from "../../redux/store";
import { fetchProductById } from "../../redux/reducers/productReducer";
import productsServer from "../../server/productServer";
import {
  addNewProduct,
  deleteAdminProduct,
  updateAdminProduct,
} from "../../redux/reducers/admin/adminProductReducer";

beforeAll(() => productsServer.listen());

afterEach(() => productsServer.resetHandlers());

afterAll(() => productsServer.close());

describe("product reducers", () => {
  test("should successfully fetch all products", async () => {
    await store.dispatch(
      fetchProducts({ pageNo: 1, perPage: 10, price_min: 0, price_max: 5000 })
    );
    expect(store.getState().products.data.length).toBe(3);
  });

  test("should fetch single product", async () => {
    await store.dispatch(fetchProductById({ id: "9" }));
    expect(store.getState().product.data).toMatchObject({
      id: "9",
      name: "Bespoke Wooden Shirt",
      price: 551,
      description:
        "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      category: {
        id: "5",
        name: "Others",
        image: "https://placeimg.com/640/480/any?r=0.591926261873231",
      },
      image: "https://placeimg.com/640/480/any?r=0.9178516507833767",

      size: {
        _id: "1",
        name: "large",
      },
    });
  });

  test("should add new product", async () => {
    let data = {
      _id: "100",
      name: "new product",
      price: 123,
      description: "it is a new product",
      category: "1",
      image: "https://www.google.com",
      stock: 11,
      size: "1",
    };
    const res = await store.dispatch(addNewProduct(data));
    expect(res.meta.arg).toMatchObject({
      _id: "100",
      name: "new product",
      price: 123,
      description: "it is a new product",
      category: "1",
      image: "https://www.google.com",
      stock: 11,
      size: "1",
    });
  });

  test("should update product data", async () => {
    let data = {
      _id: "9",
      name: "new product",
      price: 123,
      description: "it is a new product",
      category: "1",
      image: "https://www.google.com",
      stock: 11,
      size: "1",
    };

    const res = store.dispatch(updateAdminProduct({ id: data._id, data }));
    expect(res.arg).toMatchObject({
      _id: "9",
      name: "new product",
      price: 123,
      description: "it is a new product",
      category: "1",
      size: "1",
      image: "https://www.google.com",
      stock: 11,
    });
  });

  test("should delete product by id", async () => {
    const res = store.dispatch(deleteAdminProduct({ id: "9" }));
    expect(res.arg.id).toBe(9);
  });
});
