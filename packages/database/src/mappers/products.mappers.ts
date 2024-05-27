import { ProductCategory, ProductEntity } from "@domain";
import { Product } from "@prisma/client";

export const productDbToEntity = (dbProduct: Product): ProductEntity => {
  return {
    id: dbProduct.id.toString(),
    createdAt: dbProduct.createdAt,
    updatedAt: dbProduct.updatedAt,
    userId: dbProduct.userId.toString(),
    title: dbProduct.title,
    description: dbProduct.description,
    price: dbProduct.price.toNumber(),
    category: dbProduct.category as ProductCategory,
  };
};
