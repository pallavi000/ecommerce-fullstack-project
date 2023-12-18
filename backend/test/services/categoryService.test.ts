import mongoose from "mongoose";

//db-server
import connect, { MongoHelper } from "../db-server";

//model
import { Product } from "../../models/Product";
import { Category } from "../../models/Category";

//service
import CategoryService from "../../services/categoryService";

//mock-data
import categoryData from "../mockData/categoryData";
import productService from "../../services/productService";

describe("Category service", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("should create a new category", async () => {
    // create new category
    const newCategory = await CategoryService.createOne(categoryData[0]);
    expect(newCategory).toHaveProperty("name");
    expect(newCategory.name).toEqual("Clothes");
  });

  it("should return a list of categories", async () => {
    await CategoryService.createOne(categoryData[0]);
    const categories = await CategoryService.findAll();
    expect(categories.length).toEqual(1);
  });

  it("should find an existing category by an Id", async () => {
    //create a new category
    const newCategory = await CategoryService.createOne(categoryData[0]);
    //find the category by ID
    const foundCategory = await CategoryService.findOne(newCategory._id);
    expect(foundCategory).toBeDefined();
    expect(foundCategory!.name).toEqual("Clothes");
  });

  it("should return null for a non-existent category ID", async () => {
    // create a new category
    const newCategory = await CategoryService.createOne(categoryData[0]);
    const nonExistentCategoryId = new mongoose.Types.ObjectId();
    const foundCategory = await CategoryService.findOne(nonExistentCategoryId);
    expect(foundCategory).toBeNull();
  });

  it("should update an existing category", async () => {
    const newCategory = await CategoryService.createOne(categoryData[0]);
    const updatedCategory = {
      name: "updatedTest",
    };
    const result = await CategoryService.updateCategory(
      newCategory._id,
      updatedCategory
    );
    expect(result).toBeDefined();
    expect(result!.name).toEqual(updatedCategory.name);
    const retrievedCategory = await Category.findById(newCategory._id);
    expect(retrievedCategory!.name).toEqual(updatedCategory.name);
  });

  it("should return null for a non-existent category ID", async () => {
    const nonExistentCategoryId = new mongoose.Types.ObjectId();
    const updatedCategory = {
      name: "updatedTest",
    };
    const result = await CategoryService.updateCategory(
      nonExistentCategoryId,
      updatedCategory
    );
    expect(result).toBeNull();
  });

  it("should delete an existing category", async () => {
    const newCategory = await CategoryService.createOne(categoryData[0]);
    const result = await CategoryService.deleteCategory(newCategory._id);
    expect(result).toBeDefined();
    const deletedCategory = await CategoryService.findOne(newCategory._id);
    expect(deletedCategory).toBeNull();
  });

  it("should return null for a non-existent category ID", async () => {
    const nonExistentCategoryId = new mongoose.Types.ObjectId();
    const result = await CategoryService.deleteCategory(nonExistentCategoryId);
    expect(result).toBeNull();
  });

  it("should get products by category", async () => {
    // create a new category
    const newCategory = await CategoryService.createOne(categoryData[0]);
    // create products with the specified category
    const products = [
      {
        name: "Laptop",
        price: 200,
        description: "new laptop",
        image: "https://images.com/admin.png",
        category: newCategory._id,
        stock: 100,
      },
      {
        name: "Laptop 1",
        price: 200,
        description: "new laptop",
        image: "https://images.com/admin.png",
        category: newCategory._id,
        stock: 100,
      },
    ];
    await Product.create(products);

    const result = await CategoryService.getProductsByCategory(
      10,
      1,
      "-_id",
      newCategory._id.toString(),
      0,
      201
    );

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(products.length);
  });
  it("should return an empty array for a non-existent category ID", async () => {
    const nonExistentCategoryId = new mongoose.Types.ObjectId();

    const result = await CategoryService.getProductsByCategory(
      10,
      1,
      "-_id",
      nonExistentCategoryId.toString(),
      0,
      100
    );

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});
