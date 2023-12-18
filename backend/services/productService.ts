import mongoose, { Types } from "mongoose";

//model
import { Product } from "../models/Product";

//type
import { TProductSchema } from "../types/product";

async function findAll() {
  const products = await Product.find();
  return products;
}

async function findProductsAndPaginate(
  perPage: number,
  pageNo: number,
  sorting: string,
  categoryId: string,
  minPrice: Number,
  maxPrice: Number,
  sizes: string[]
) {
  let query: any = {};
  if (categoryId) {
    query.category = categoryId;
  }
  query.price = { $gte: minPrice, $lte: maxPrice };
  if (sizes.length) {
    query.size = { $in: sizes };
  }
  const [totalProducts, products] = await Promise.all([
    Product.countDocuments(query).exec(),
    Product.find(query)
      .populate("category")
      .populate("size")
      .limit(perPage)
      .skip(perPage * (pageNo - 1))
      .sort(sorting)
      .exec(),
  ]);
  const totalPages = Math.ceil(totalProducts / perPage);
  return { products, currentPage: pageNo, totalPages, totalProducts };
}

async function findById(productId: string | Types.ObjectId) {
  return await Product.findById(productId)
    .populate("category")
    .populate("size");
}

async function createOne(product: TProductSchema) {
  const newProduct = await Product.create(product);
  return newProduct.populate(["category", "size"]);
}

async function updateProduct(
  productId: string | Types.ObjectId,
  product: TProductSchema
) {
  const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
    new: true,
  })
    .populate("category")
    .populate("size");
  return updatedProduct;
}

async function deleteProduct(productId: string | Types.ObjectId) {
  return await Product.findByIdAndDelete(productId);
}

async function searchProductsAndPaginate(
  perPage: number,
  pageNo: number,
  sorting: string,
  categoryId: string,
  minPrice: Number,
  maxPrice: Number,
  sizes: string[],
  regex: any
) {
  let query: any = {};
  if (categoryId) {
    query.category = categoryId;
  }
  if (sizes.length) {
    query.size = { $in: sizes };
  }
  query.price = { $gte: minPrice, $lte: maxPrice };
  query.name = { $in: regex };
  const [totalProducts, products] = await Promise.all([
    Product.countDocuments(query).exec(),
    Product.find(query)
      .populate("category")
      .populate("size")
      .limit(perPage)
      .skip(perPage * (pageNo - 1))
      .sort(sorting)
      .exec(),
  ]);
  const totalPages = Math.ceil(totalProducts / perPage);
  return { products, currentPage: pageNo, totalPages, totalProducts };
}

export default {
  findById,
  findAll,
  createOne,
  updateProduct,
  deleteProduct,
  searchProductsAndPaginate,
  findProductsAndPaginate,
};
