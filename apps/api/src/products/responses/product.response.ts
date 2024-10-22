import { ProductCategory, ProductEntity } from '@marketplace/domain';

export class ProductResponse {
  title: string;
  price: number;
  description: string;
  category: ProductCategory;

  static fromProductEntity(product: ProductEntity): ProductResponse {
    return {
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
    };
  }
}
