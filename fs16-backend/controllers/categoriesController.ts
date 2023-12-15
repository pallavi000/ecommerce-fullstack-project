import { NextFunction, Request, Response } from "express";

// services
import CategoryService from "../services/categoryService";

// error builder
import { ApiError } from "../errors/ApiError";

//type
import { TCategorySchema } from "../types/category";

export async function findAllCategory(
  _: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categories = await CategoryService.findAll();
    res.json(categories);
  } catch (error) {
    next(ApiError.internal("Error in fetching categories"));
  }
}

export async function findOneCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryId = req.params.categoryId;
    const category = await CategoryService.findOne(categoryId);
    if (!category) {
      const notFoundError = ApiError.resourceNotFound("Category not found.");
      return next(notFoundError);
    }
    res.json(category);
  } catch (error) {
    const internalServerError = ApiError.internal("Internal server error.");
    next(internalServerError);
  }
}

export async function createOneCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newCategory: TCategorySchema = req.body;
    const category = await CategoryService.createOne(newCategory);
    res.status(201).json(category);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryId = req.params.categoryId;
    const updateCategoryData: TCategorySchema = req.body;
    const category = await CategoryService.findOne(categoryId);
    if (!category) {
      return next(ApiError.resourceNotFound("Category not found."));
    }
    const updatedCategory = await CategoryService.updateCategory(
      categoryId,
      updateCategoryData
    );
    res.json(updatedCategory);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryId = req.params.categoryId;
    const category = await CategoryService.findOne(categoryId);
    if (!category) {
      next(ApiError.resourceNotFound("Category not found."));
      return;
    }
    await CategoryService.deleteCategory(categoryId);
    res.status(204).send();
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

//Get all products by category
export async function filterProductByCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const categoryId = req.params.categoryId;
  const perPage = req.query.perPage || 12;
  const pageNo = req.query.pageNo || 1;
  const sorting = req.query.sorting || "-_id";
  const minPrice = req.query.minPrice || 0;
  const maxPrice = req.query.maxPrice || 9999999;
  const { page, limit }: any = req.query;
  try {
    res.json(
      await CategoryService.getProductsByCategory(
        Number(perPage),
        Number(pageNo),
        sorting.toString(),
        categoryId,
        Number(minPrice),
        Number(maxPrice)
      )
    );
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}
