import { type BaseEntity } from "./base.entity";

export enum ProductCategory {
  CLOTHING = "CLOTHING",
  FOOD = "FOOD",
  ELECTRONICS = "ELECTRONICS",
  BOOKS = "BOOKS",
  OTHER = "OTHER",
}

export interface ProductEntity extends BaseEntity {
  userId: string;
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
}
