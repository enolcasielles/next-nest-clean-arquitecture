import {
  PaginatedResponse,
  type CreateProductRequest,
  type GetProductsRequest,
  type IProductsRepository,
  type ProductEntity,
  ProductCategory,
} from "@domain";
import db from "../db";

export class ProductsRepository implements IProductsRepository {
  async create(
    userId: string,
    productRequest: CreateProductRequest,
  ): Promise<ProductEntity> {
    const dbProduct = await db.product.create({
      data: {
        title: productRequest.title,
        description: productRequest.description,
        price: productRequest.price.toString(),
        category: productRequest.category,
      },
    });
    return {
      id: dbProduct.id,
      createdAt: dbProduct.createdAt,
      updatedAt: dbProduct.updatedAt,
      userId: userId,
      title: dbProduct.title,
      description: dbProduct.description,
      price: dbProduct.price.toNumber(),
      category: dbProduct.category as ProductCategory,
    };
  }

  async get(
    userId: string,
    query: GetProductsRequest,
  ): Promise<PaginatedResponse<ProductEntity>> {
    const pageSize = query.pageSize ?? 10;
    const page = query.page ?? 1;
    const [results, count] = await db.product.findManyAndCount({
      take: pageSize ?? 10,
      skip: (page - 1) * pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      items: results.map((dbProduct) => ({
        id: dbProduct.id,
        createdAt: dbProduct.createdAt,
        updatedAt: dbProduct.updatedAt,
        userId: userId,
        title: dbProduct.title,
        description: dbProduct.description,
        price: dbProduct.price.toNumber(),
        category: dbProduct.category as ProductCategory,
      })),
      totalItems: await db.product.count(),
      currentPage: query.page,
      itemCount: results.length,
      totalPages: Math.ceil(count / query.pageSize),
    };
  }

  async getById(id: string): Promise<ProductEntity> {
    console.log("id", id);
    return null;
  }

  async delete(id: string): Promise<boolean> {
    console.log("id", id);
    return null;
  }
}
