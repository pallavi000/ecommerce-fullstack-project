import mongoose from "mongoose";

//db-server
import connect, { MongoHelper } from "../db-server";

//mock-data
import productData from "../mockData/productData";

//services
import ProductService from "../../services/productService";
import CategoryService from "../../services/categoryService";
import SizeService from "../../services/sizeService";

// Success test cases
describe("Product Service - Success Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
    await CategoryService.findAll();
    await SizeService.findAll();
  });

  test("should create a product", async () => {
    const response = await ProductService.createOne(productData[0]);
    expect(response.name).toBe(productData[0].name);
  });

  test("should search products by name", async () => {
    const response = await ProductService.searchProductsAndPaginate(
      10,
      1,
      "-_id",
      "",
      0,
      1000,
      [new RegExp(productData[0].name, "i")]
    );
    expect(response.products.length).toEqual(1);
  });

  test("should return specific product by its id", async () => {
    const newProduct = await ProductService.createOne(productData[0]);
    //find the category by ID
    const foundProduct = await ProductService.findById(newProduct._id);
    expect(foundProduct).toBeDefined();
    expect(foundProduct?.name).toEqual(productData[0].name);
  });

  test("should update a product by its id", async () => {
    const newProduct = await ProductService.createOne(productData[0]);
    const result = await ProductService.updateProduct(newProduct._id, {
      ...productData[0],
      name: "new product",
    });
    expect(result).toBeDefined();
    expect(result?.name).toEqual("new product");
  });

  test("should delete a product by its id", async () => {
    const newProduct = await ProductService.createOne(productData[0]);
    const result = await ProductService.deleteProduct(newProduct._id);
    expect(result).toBeDefined();
    const deletedProduct = await ProductService.findById(newProduct._id);
    expect(deletedProduct).toBeNull();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
});

//Failure test cases
describe("Product Services - Failure Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should not find a product for a non-existent product ID", async () => {
    // create a new category
    const newProduct = await ProductService.createOne(productData[0]);
    const nonExistentProductId = new mongoose.Types.ObjectId();
    const foundProduct = await ProductService.findById(nonExistentProductId);
    expect(foundProduct).toBeNull();
  });

  test("should not allow to update a product by its id; invalid params", async () => {
    const newProduct = await ProductService.createOne(productData[0]);
    const result = await ProductService.updateProduct(
      newProduct._id,
      productData[1]
    );
    expect(result).toBeDefined();
    expect(result!.name).toEqual(productData[1].name);
    const retrievedProduct = await ProductService.findById(newProduct._id);
    expect(retrievedProduct?.name).toEqual(productData[1].name);
  });

  it("should return null for a non-existent category ID while DELETE", async () => {
    const nonExistentProductId = new mongoose.Types.ObjectId();
    const result = await ProductService.deleteProduct(nonExistentProductId);
    expect(result).toBeNull();
  });
});
