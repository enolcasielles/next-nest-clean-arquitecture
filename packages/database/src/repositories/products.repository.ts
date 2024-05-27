import {
  PaginatedResponse,
  type CreateProductRequest,
  type GetProductsRequest,
  type IProductsRepository,
  type ProductEntity,
} from "@domain";
import db from "../db";
import { productDbToEntity } from "../mappers/products.mappers";

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
        userId: parseInt(userId),
      },
    });
    return productDbToEntity(dbProduct);
  }

  async getAll(
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
      items: results.map((dbProduct) => productDbToEntity(dbProduct)),
      totalItems: await db.product.count(),
      currentPage: query.page,
      itemCount: results.length,
      totalPages: Math.ceil(count / query.pageSize),
    };
  }

  async get(
    userId: string,
    query: GetProductsRequest,
  ): Promise<PaginatedResponse<ProductEntity>> {
    const pageSize = query.pageSize ?? 10;
    const page = query.page ?? 1;
    const where = {
      userId: parseInt(userId),
    };
    const [results, count] = await db.product.findManyAndCount({
      where,
      take: pageSize ?? 10,
      skip: (page - 1) * pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      items: results.map((dbProduct) => productDbToEntity(dbProduct)),
      totalItems: await db.product.count({
        where,
      }),
      currentPage: query.page,
      itemCount: results.length,
      totalPages: Math.ceil(count / query.pageSize),
    };
  }

  async getById(id: string): Promise<ProductEntity> {
    const dbProduct = await db.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!dbProduct) return null;
    return productDbToEntity(dbProduct);
  }

  async delete(id: string): Promise<boolean> {
    await db.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    return true;
  }
}
