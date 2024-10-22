import { ProductCategory } from "../index";

export interface CreateProductRequest {
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
}
