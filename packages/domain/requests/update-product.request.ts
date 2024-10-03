import { ProductCategory } from "../index";

export interface UpdateProductRequest {
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
}
