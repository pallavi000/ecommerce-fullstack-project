import { Product } from "../../../models/Product";
import { Category } from "../../../models/Category";
import { Size } from "../../../models/Size";
import { TCategory } from "../../../types/category";
import { TProductSchema } from "../../../types/product";
import { TSize } from "../../../types/size";
import productsSeedData from "../data/productsSeedData";

function splitProductsByCategoriesSizes(
  categories: TCategory[],
  products: TProductSchema[],
  sizes: TSize[]
) {
  const categoryCount = categories.length;
  const productsPerCategory = Math.ceil(products.length / categoryCount);
  const dividedProducts: TProductSchema[] = [];
  for (let i = 0; i < categoryCount; i++) {
    var randomSizeIndex = Math.floor(Math.random() * sizes.length);
    const startIndex = i * productsPerCategory;
    const endIndex = startIndex + productsPerCategory;
    const categoryProducts = products.slice(startIndex, endIndex);
    dividedProducts.push(
      ...categoryProducts.map((p) => ({
        ...p,
        category: categories[i]._id,
        size: sizes[randomSizeIndex]._id,
      }))
    );
  }
  return dividedProducts;
}

export async function productFactory() {
  const categories: TCategory[] = await Category.find().lean();
  const sizes: TSize[] = await Size.find().lean();
  const productsData = splitProductsByCategoriesSizes(
    categories,
    productsSeedData,
    sizes
  );
  await Product.insertMany(productsData);
  console.log("products created successfully.");
}
